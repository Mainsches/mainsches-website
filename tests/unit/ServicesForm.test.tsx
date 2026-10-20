import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ServiceInterest } from "@/lib/services/schema";
import { ServicesForm } from "@/components/services/ServicesForm";
import { en } from "@/lib/i18n/dictionaries/en";

const dict = en.servicesPage.form;

function renderForm(interest: ServiceInterest | "" = "") {
  const Wrapper = () => {
    const [selected, setSelected] = useState<ServiceInterest | "">(interest);
    return (
      <ServicesForm
        dict={dict}
        locale="en"
        interest={selected}
        onInterestChange={setSelected}
      />
    );
  };
  return render(<Wrapper />);
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(new RegExp(dict.name)), {
    target: { value: "Ada Lovelace" },
  });
  fireEvent.change(screen.getByLabelText(new RegExp(dict.email)), {
    target: { value: "ada@example.com" },
  });
  fireEvent.change(screen.getByLabelText(new RegExp(dict.interest)), {
    target: { value: "potentialAnalysis" },
  });
  fireEvent.change(screen.getByLabelText(new RegExp(dict.message)), {
    target: { value: "We want help automating recurring reporting tasks." },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ServicesForm", () => {
  it("blocks submission and lists accessible errors when empty", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    renderForm();

    fireEvent.submit(
      screen.getByRole("button", { name: dict.submit }).closest("form")!,
    );

    const summary = await screen.findByRole("alert");
    expect(summary).toHaveTextContent(dict.errorSummaryTitle);
    expect(summary).toHaveTextContent(dict.errors.name);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("submits valid data and reports real success", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchSpy);
    renderForm();

    fillValidForm();
    fireEvent.submit(
      screen.getByRole("button", { name: dict.submit }).closest("form")!,
    );

    await waitFor(() =>
      expect(screen.getByText(dict.success)).toBeInTheDocument(),
    );
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("/api/services");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.email).toBe("ada@example.com");
    expect(body.locale).toBe("en");
  });

  it("preselects interest from card CTA preset", () => {
    renderForm("automation");
    expect(screen.getByLabelText(new RegExp(dict.interest))).toHaveValue(
      "automation",
    );
  });
});

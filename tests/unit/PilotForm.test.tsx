import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PilotForm } from "@/components/pilot/PilotForm";
import { en } from "@/lib/i18n/dictionaries/en";

const dict = en.pilotPage.form;

function renderForm() {
  return render(<PilotForm dict={dict} locale="en" />);
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(new RegExp(dict.name)), {
    target: { value: "Ada Lovelace" },
  });
  fireEvent.change(screen.getByLabelText(new RegExp(dict.email)), {
    target: { value: "ada@example.com" },
  });
  fireEvent.change(screen.getByLabelText(new RegExp(dict.company)), {
    target: { value: "Analytical Engines AG" },
  });
  fireEvent.change(screen.getByLabelText(new RegExp(dict.role)), {
    target: { value: "CTO" },
  });
  fireEvent.click(screen.getByLabelText(new RegExp(dict.interestPilot)));
  fireEvent.change(screen.getByLabelText(new RegExp(dict.message)), {
    target: { value: "We want to evaluate Mainsches Hub in a pilot." },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("PilotForm", () => {
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
    expect(summary).toHaveTextContent(dict.errors.consent);
    expect(fetchSpy).not.toHaveBeenCalled();

    // Fields are marked invalid for assistive technology.
    expect(screen.getByLabelText(new RegExp(dict.name))).toHaveAttribute(
      "aria-invalid",
      "true",
    );
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
    expect(url).toBe("/api/pilot");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.email).toBe("ada@example.com");
    expect(body.interest).toBe("pilot");
    expect(body.website).toBe("");
  });

  it("shows an honest fallback instead of fake success when mail is not configured", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, configured: false }), {
        status: 503,
      }),
    );
    vi.stubGlobal("fetch", fetchSpy);
    renderForm();

    fillValidForm();
    fireEvent.submit(
      screen.getByRole("button", { name: dict.submit }).closest("form")!,
    );

    await waitFor(() =>
      expect(screen.getByText(dict.notConfiguredTitle)).toBeInTheDocument(),
    );
    expect(screen.queryByText(dict.success)).not.toBeInTheDocument();

    // A real contact fallback is offered.
    const mailto = screen
      .getAllByRole("link")
      .find((link) => link.getAttribute("href")?.startsWith("mailto:"));
    expect(mailto).toBeDefined();
  });

  it("shows an error state with fallback when the server fails", async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: false }), { status: 500 }),
      );
    vi.stubGlobal("fetch", fetchSpy);
    renderForm();

    fillValidForm();
    fireEvent.submit(
      screen.getByRole("button", { name: dict.submit }).closest("form")!,
    );

    await waitFor(() =>
      expect(screen.getByText(dict.serverError)).toBeInTheDocument(),
    );
    expect(screen.queryByText(dict.success)).not.toBeInTheDocument();
  });

  it("includes a honeypot field that is hidden from real users", () => {
    renderForm();
    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot!.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });
});

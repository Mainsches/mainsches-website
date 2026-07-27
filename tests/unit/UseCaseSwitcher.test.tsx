import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UseCaseSwitcher } from "@/components/home/UseCaseSwitcher";
import { en } from "@/lib/i18n/dictionaries/en";

const dict = en.home.useCases;
const plannedLabel = en.common.planned;

describe("UseCaseSwitcher", () => {
  it("renders a tab for every use case", () => {
    render(<UseCaseSwitcher dict={dict} plannedLabel={plannedLabel} />);
    expect(screen.getAllByRole("tab")).toHaveLength(dict.cases.length);
  });

  it("shows the first use case by default", () => {
    render(<UseCaseSwitcher dict={dict} plannedLabel={plannedLabel} />);
    const first = dict.cases[0]!;
    expect(screen.getByRole("tabpanel")).toHaveTextContent(first.summary);
  });

  it("switches the panel without a reload when a tab is clicked", () => {
    render(<UseCaseSwitcher dict={dict} plannedLabel={plannedLabel} />);
    const second = dict.cases[1]!;

    fireEvent.click(screen.getByRole("tab", { name: new RegExp(second.title) }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent(second.summary);
  });

  it("clearly marks planned connectors as planned", () => {
    render(<UseCaseSwitcher dict={dict} plannedLabel={plannedLabel} />);
    const planned = dict.cases.find((item) => item.planned);
    expect(planned).toBeDefined();

    fireEvent.click(
      screen.getByRole("tab", { name: new RegExp(planned!.title) }),
    );

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent(plannedLabel);
    if (planned!.plannedNote) {
      expect(panel).toHaveTextContent(planned!.plannedNote);
    }
  });
});

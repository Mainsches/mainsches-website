import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkflowExplorer } from "@/components/home/WorkflowExplorer";
import { en } from "@/lib/i18n/dictionaries/en";

const dict = en.home.flow;

describe("WorkflowExplorer", () => {
  it("renders all six pipeline steps as tabs", () => {
    render(<WorkflowExplorer dict={dict} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(6);
    for (const [index, step] of dict.steps.entries()) {
      expect(tabs[index]).toHaveTextContent(step.name);
    }
  });

  it("shows what/why/benefit for the selected step", () => {
    render(<WorkflowExplorer dict={dict} />);
    const first = dict.steps[0]!;
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent(first.what);
    expect(panel).toHaveTextContent(first.why);
    expect(panel).toHaveTextContent(first.benefit);
  });

  it("updates the panel when another step is clicked", () => {
    render(<WorkflowExplorer dict={dict} />);
    const third = dict.steps[2]!;

    fireEvent.click(screen.getByRole("tab", { name: new RegExp(third.name) }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent(third.what);
    expect(
      screen.getByRole("tab", { name: new RegExp(third.name) }),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("moves selection with arrow keys (roving tabindex)", () => {
    render(<WorkflowExplorer dict={dict} />);
    const tabs = screen.getAllByRole("tab");

    fireEvent.keyDown(tabs[0]!, { key: "ArrowRight" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("tabindex", "0");
    expect(tabs[0]).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(tabs[1]!, { key: "Home" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(tabs[0]!, { key: "End" });
    expect(tabs[5]).toHaveAttribute("aria-selected", "true");
  });
});

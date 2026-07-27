import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HubConsole } from "@/components/home/HubConsole";
import { en } from "@/lib/i18n/dictionaries/en";

const dict = en.home.console;
const scenarios = dict.scenarios;

function renderConsole() {
  return render(
    <HubConsole dict={dict} conceptDemoLabel={en.common.conceptDemo} />,
  );
}

describe("HubConsole", () => {
  it("renders one tab per scenario and marks it as a concept demo", () => {
    renderConsole();
    expect(screen.getAllByRole("tab")).toHaveLength(scenarios.length);
    expect(screen.getByText(en.common.conceptDemo)).toBeInTheDocument();
  });

  it("starts with the goal step and reveals all five steps over time", async () => {
    renderConsole();
    const first = scenarios[0]!;

    // Step 1 (goal) is visible immediately, the result is not yet.
    expect(screen.getByText(first.goal)).toBeInTheDocument();
    expect(screen.queryByText(first.result)).not.toBeInTheDocument();

    // The controlled sequence finishes on its own (5 steps × 650 ms).
    await waitFor(
      () => expect(screen.getByText(first.result)).toBeInTheDocument(),
      { timeout: 6000 },
    );
    expect(screen.getByText(first.context)).toBeInTheDocument();
    expect(screen.getByText(first.workflow)).toBeInTheDocument();
  });

  it("switches scenarios on click and restarts the sequence", () => {
    renderConsole();
    const second = scenarios[1]!;

    fireEvent.click(screen.getByRole("tab", { name: second.chip }));

    expect(screen.getByRole("tab", { name: second.chip })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText(second.goal)).toBeInTheDocument();
    // Restart: later steps hidden again right after switching.
    expect(screen.queryByText(second.result)).not.toBeInTheDocument();
  });

  it("supports arrow-key navigation between scenarios", () => {
    renderConsole();
    const tabs = screen.getAllByRole("tab");

    fireEvent.keyDown(tabs[0]!, { key: "ArrowDown" });

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  it("offers a replay control", async () => {
    renderConsole();
    const first = scenarios[0]!;

    await waitFor(
      () => expect(screen.getByText(first.result)).toBeInTheDocument(),
      { timeout: 6000 },
    );

    fireEvent.click(screen.getByRole("button", { name: dict.replay }));
    expect(screen.queryByText(first.result)).not.toBeInTheDocument();
    expect(screen.getByText(first.goal)).toBeInTheDocument();
  });
});

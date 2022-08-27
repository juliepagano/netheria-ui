import TotalRuns from "./TotalRuns";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const MOCK_EMPTY_ACTIONS: OctomizeActionOptions = {
  benchmark: { selected: false },
  accelerate: { selected: false },
};
const MOCK_BENCHMARK: OctomizeActionOptions = {
  benchmark: { selected: true },
  accelerate: { selected: false },
};

const MOCK_EMPTY_TARGETS: SelectedHardwareTarget[] = [];

const MOCK_TARGETS: SelectedHardwareTarget[] = [
  {
    id: 1,
    provider: "AWS",
    instance: "m4.xlarge",
    cpu: 4,
    memory: 16,
  },
];

describe("TotalRuns", () => {
  describe("without targets or actions", () => {
    test("disables button", () => {
      render(
        <TotalRuns actions={MOCK_EMPTY_ACTIONS} targets={MOCK_EMPTY_TARGETS} />
      );

      expect(
        screen.getByRole("button", {
          name: "Octomize",
        })
      ).toBeDisabled();
    });

    test("communicates there are zero runs", () => {
      render(
        <TotalRuns actions={MOCK_EMPTY_ACTIONS} targets={MOCK_EMPTY_TARGETS} />
      );

      expect(screen.getByTestId("totalRuns")).toHaveTextContent("0");
    });
  });

  describe("with only targets", () => {
    test("disables button", () => {
      render(<TotalRuns actions={MOCK_EMPTY_ACTIONS} targets={MOCK_TARGETS} />);

      expect(
        screen.getByRole("button", {
          name: "Octomize",
        })
      ).toBeDisabled();
    });

    test("communicates there are zero runs", () => {
      render(<TotalRuns actions={MOCK_EMPTY_ACTIONS} targets={MOCK_TARGETS} />);

      expect(screen.getByTestId("totalRuns")).toHaveTextContent("0");
    });
  });

  describe("with only actions", () => {
    test("disables button", () => {
      render(
        <TotalRuns actions={MOCK_BENCHMARK} targets={MOCK_EMPTY_TARGETS} />
      );

      expect(
        screen.getByRole("button", {
          name: "Octomize",
        })
      ).toBeDisabled();
    });

    test("communicates there are zero runs", () => {
      render(
        <TotalRuns actions={MOCK_BENCHMARK} targets={MOCK_EMPTY_TARGETS} />
      );

      expect(screen.getByTestId("totalRuns")).toHaveTextContent("0");
    });
  });
});

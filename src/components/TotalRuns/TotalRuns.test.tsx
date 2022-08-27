import TotalRuns from "./TotalRuns";
import { render, screen, getAllByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const MOCK_EMPTY_ACTIONS: OctomizeActionOptions = {
  benchmark: { selected: false },
  accelerate: { selected: false },
};
const MOCK_BENCHMARK: OctomizeActionOptions = {
  benchmark: { selected: true },
  accelerate: { selected: false },
};
const MOCK_ACCELERATE: OctomizeActionOptions = {
  benchmark: { selected: true },
  accelerate: { selected: false },
};
const MOCK_ALL_TARGETS: OctomizeActionOptions = {
  benchmark: { selected: true },
  accelerate: { selected: true },
};

const MOCK_EMPTY_TARGETS: SelectedHardwareTarget[] = [];

const MOCK_TARGETS: Required<SelectedHardwareTarget>[] = [
  {
    id: 1,
    provider: "AWS",
    instance: "m4.xlarge",
    cpu: 4,
    memory: 16,
  },
  {
    id: 2,
    provider: "GCP",
    instance: "n2-standard-4",
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
        <TotalRuns actions={MOCK_ACCELERATE} targets={MOCK_EMPTY_TARGETS} />
      );

      expect(screen.getByTestId("totalRuns")).toHaveTextContent("0");
    });
  });

  describe("with benchmark", () => {
    test("enables button", () => {
      render(<TotalRuns actions={MOCK_BENCHMARK} targets={MOCK_TARGETS} />);

      expect(
        screen.getByRole("button", {
          name: "Octomize",
        })
      ).not.toBeDisabled();
    });

    test("communicates there is 1 run for each hardware target", () => {
      render(<TotalRuns actions={MOCK_BENCHMARK} targets={MOCK_TARGETS} />);

      expect(screen.getByTestId("totalRuns")).toHaveTextContent(
        `${MOCK_TARGETS.length}`
      );
    });

    test("lists a summary of the hardware targets", () => {
      render(<TotalRuns actions={MOCK_BENCHMARK} targets={MOCK_TARGETS} />);

      const summaryList = screen.getByTestId("targetSummary");
      const summaryItems = getAllByRole(summaryList, "listitem");

      expect(summaryItems).toHaveLength(MOCK_TARGETS.length);
      summaryItems.forEach((item, i) => {
        expect(item).toHaveTextContent(MOCK_TARGETS[i].instance);
        expect(item).toHaveTextContent(`${MOCK_TARGETS[i].cpu} cores`);
      });
    });
  });

  describe("with accelerate", () => {
    test("enables button", () => {
      render(<TotalRuns actions={MOCK_ACCELERATE} targets={MOCK_TARGETS} />);

      expect(
        screen.getByRole("button", {
          name: "Octomize",
        })
      ).not.toBeDisabled();
    });

    test("communicates there is 1 run for each hardware target", () => {
      render(<TotalRuns actions={MOCK_ACCELERATE} targets={MOCK_TARGETS} />);

      expect(screen.getByTestId("totalRuns")).toHaveTextContent(
        `${MOCK_TARGETS.length}`
      );
    });

    test("lists a summary of the hardware targets", () => {
      render(<TotalRuns actions={MOCK_ACCELERATE} targets={MOCK_TARGETS} />);

      const summaryList = screen.getByTestId("targetSummary");
      const summaryItems = getAllByRole(summaryList, "listitem");

      expect(summaryItems).toHaveLength(MOCK_TARGETS.length);
      summaryItems.forEach((item, i) => {
        expect(item).toHaveTextContent(MOCK_TARGETS[i].instance);
        expect(item).toHaveTextContent(`${MOCK_TARGETS[i].cpu} cores`);
      });
    });
  });

  describe("with accelerate and benchmark", () => {
    test("enables button", () => {
      render(<TotalRuns actions={MOCK_ALL_TARGETS} targets={MOCK_TARGETS} />);

      expect(
        screen.getByRole("button", {
          name: "Octomize",
        })
      ).not.toBeDisabled();
    });

    test("communicates there are 2 runs for each hardware target", () => {
      render(<TotalRuns actions={MOCK_ALL_TARGETS} targets={MOCK_TARGETS} />);

      expect(screen.getByTestId("totalRuns")).toHaveTextContent(
        `${MOCK_TARGETS.length * 2}`
      );
    });

    test("lists a summary of the hardware targets", () => {
      render(<TotalRuns actions={MOCK_ALL_TARGETS} targets={MOCK_TARGETS} />);

      const summaryList = screen.getByTestId("targetSummary");
      const summaryItems = getAllByRole(summaryList, "listitem");

      expect(summaryItems).toHaveLength(MOCK_TARGETS.length);
      summaryItems.forEach((item, i) => {
        expect(item).toHaveTextContent(MOCK_TARGETS[i].instance);
        expect(item).toHaveTextContent(`${MOCK_TARGETS[i].cpu} cores`);
      });
    });
  });
});

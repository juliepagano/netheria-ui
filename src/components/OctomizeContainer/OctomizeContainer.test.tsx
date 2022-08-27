import OctomizeContainer from "./OctomizeContainer";
import {
  render,
  screen,
  getAllByRole,
  getByText,
  getByRole,
} from "@testing-library/react";
import * as internalService from "../../services/internalService";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const mockGetHardwareTargets = jest.fn();

jest.mock("../../services/internalService", () => {
  return {
    getHardwareTargets: () => {
      return mockGetHardwareTargets();
    },
  };
});

const MOCK_HARDWARE_TARGETS = [
  {
    provider: "AWS",
    instance: "m4.4xlarge",
    cpu: 16,
    memory: 64,
  },
  {
    provider: "GCP",
    instance: "n2-standard-2",
    cpu: 2,
    memory: 8,
  },
  {
    provider: "GCP",
    instance: "n2-standard-4",
    cpu: 4,
    memory: 16,
  },
  {
    provider: "Azure",
    instance: "some-azure-instace",
    cpu: 4,
    memory: 32,
  },
];

describe("OctomizeContainer", () => {
  beforeEach(async () => {
    mockGetHardwareTargets.mockResolvedValue(MOCK_HARDWARE_TARGETS);

    render(<OctomizeContainer />);
    // Wait for async things to finish.
    await screen.findAllByRole("table");
  });

  test("fetches hardware targets", async () => {
    expect(mockGetHardwareTargets).toHaveBeenCalledTimes(1);
  });

  test("initially renders hardware table with one entry that needs to be filled out", async () => {
    // Wait for async things to finish.
    await screen.findAllByRole("table");

    // This is 2 because the header also has a row.
    expect(screen.getAllByRole("row")).toHaveLength(2);

    expect(screen.getByRole("combobox")).toHaveValue(undefined);
  });

  test("lists zero total runs", () => {
    expect(screen.getByTestId("totalRuns")).toHaveTextContent("0");
  });

  test("provider includes a placeholder and options from hardware targets", async () => {
    // Wait for async things to finish.
    await screen.findAllByRole("table");

    const options = screen.getAllByRole("option");

    expect(options.length).toEqual(4);
    expect(options[0]).toHaveTextContent("Select Provider");

    // Currently these are sorted by the order they are seen in the response.
    // It may make more sense to sort them alphabetically OR it could be they
    // are in a priority order and this is right. Punting on digging into it
    // more for this exercise.
    expect(options[1]).toHaveTextContent("AWS");
    expect(options[2]).toHaveTextContent("GCP");
    expect(options[3]).toHaveTextContent("Azure");
  });

  describe("on select a provider", () => {
    beforeEach(async () => {
      const providerSelect = await user.selectOptions(
        screen.getByRole("combobox"),
        ["GCP"]
      );
    });

    test("provider is selected", () => {
      const option = screen.getByRole("option", {
        name: "GCP",
      });

      expect(option.parentElement).toHaveValue("GCP");
    });

    test("instance includes a placeholder and options from hardware targets", () => {
      const instance = screen.getAllByRole("combobox")[1];
      const options = getAllByRole(instance, "option");

      expect(options.length).toEqual(3);
      expect(options[0]).toHaveTextContent("Select Instance");

      // Currently these are sorted by the order they are seen in the response.
      // It may make more sense to sort them numerically OR it could be they
      // are in a priority order and this is right. Punting on digging into it
      // more for this exercise.
      expect(options[1]).toHaveTextContent("n2-standard-2");
      expect(options[2]).toHaveTextContent("n2-standard-4");
    });

    test("lists zero total runs", () => {
      expect(screen.getByTestId("totalRuns")).toHaveTextContent("0");
    });

    describe("on select an instance", () => {
      beforeEach(async () => {
        const instanceSelect = await user.selectOptions(
          screen.getAllByRole("combobox")[1],
          ["n2-standard-4"]
        );
      });

      test("provider is selected", () => {
        const option = screen.getByRole("option", {
          name: "GCP",
        });

        expect(option.parentElement).toHaveValue("GCP");
      });

      test("instance is selected", () => {
        const option = screen.getByRole("option", {
          name: "n2-standard-4",
        });

        expect(option.parentElement).toHaveValue("n2-standard-4");
      });

      test("associate cpu is listed", () => {
        screen.getByText("4", {
          selector: "td",
        });
      });

      test("associate memory is listed", () => {
        screen.getByText("16", {
          selector: "td",
        });
      });

      test("lists zero total runs", () => {
        expect(screen.getByTestId("totalRuns")).toHaveTextContent("0");
      });

      describe("on check benchmark", () => {
        beforeEach(async () => {
          await user.click(screen.getByLabelText("Benchmark"));
        });

        test("lists one total run", () => {
          expect(screen.getByTestId("totalRuns")).toHaveTextContent("1");
        });
      });

      describe("on check accelerate", () => {
        beforeEach(async () => {
          await user.click(screen.getByLabelText("Accelerate"));
        });

        test("lists one total run", () => {
          expect(screen.getByTestId("totalRuns")).toHaveTextContent("1");
        });
      });

      describe("on check both actions", () => {
        beforeEach(async () => {
          await user.click(screen.getByLabelText("Accelerate"));
          await user.click(screen.getByLabelText("Benchmark"));
        });

        test("lists one total run", () => {
          expect(screen.getByTestId("totalRuns")).toHaveTextContent("2");
        });
      });
    });
  });

  describe("on add multiple targets and actions", () => {
    beforeEach(async () => {
      for (let i = 0; i < MOCK_HARDWARE_TARGETS.length; i++) {
        if (i) {
          await user.click(
            screen.getByRole("button", {
              name: "Add",
            })
          );
        }
        const mockTarget = MOCK_HARDWARE_TARGETS[i];

        await user.selectOptions(
          // @ts-ignore
          // I don't want to fight TS on this. The test will fail if it's empty
          // for some reason.
          screen.getAllByRole("combobox").at(-1),
          mockTarget.provider
        );
        await user.selectOptions(
          // @ts-ignore
          // I don't want to fight TS on this. The test will fail if it's empty
          // for some reason.
          screen.getAllByRole("combobox").at(-1),
          mockTarget.instance
        );
      }

      await user.click(screen.getByLabelText("Benchmark"));
      await user.click(screen.getByLabelText("Accelerate"));
    });

    test("has a row for each entry with the correct content", () => {
      const rows = screen.getAllByRole("row");

      // One extra for the header row
      expect(rows).toHaveLength(5);

      rows.slice(1).forEach((row, i) => {
        const matchingTarget = MOCK_HARDWARE_TARGETS[i];

        const selects = getAllByRole(row, "combobox");
        expect(selects[0]).toHaveValue(matchingTarget.provider);
        expect(selects[1]).toHaveValue(matchingTarget.instance);

        const tds = getAllByRole(row, "cell");
        expect(tds[2]).toHaveTextContent(`${matchingTarget.cpu}`);
        expect(tds[3]).toHaveTextContent(`${matchingTarget.memory}`);
      });
    });

    test("lists total runs", () => {
      expect(screen.getByTestId("totalRuns")).toHaveTextContent(
        `${MOCK_HARDWARE_TARGETS.length * 2}`
      );
    });

    describe("on remove second row", () => {
      beforeEach(async () => {
        const rows = screen.getAllByRole("row");

        // This is not an off-by-one -- there is an extra row for the header
        const secondRemove = getByRole(rows[2], "button", {
          name: "remove",
        });
        await user.click(secondRemove);
      });

      test("has a row for each non-removed entry with the correct content", () => {
        const rows = screen.getAllByRole("row");

        // One extra for the header row
        expect(rows).toHaveLength(4);

        // Make a copy of the hardware targets removing the entry we removed for
        // ease for comparison when testing.
        const mockTargetsWithoutRemoved = MOCK_HARDWARE_TARGETS.slice();
        mockTargetsWithoutRemoved.splice(1, 1);

        rows.slice(1).forEach((row, i) => {
          const matchingTarget = mockTargetsWithoutRemoved[i];

          const selects = getAllByRole(row, "combobox");
          expect(selects[0]).toHaveValue(matchingTarget.provider);
          expect(selects[1]).toHaveValue(matchingTarget.instance);

          const tds = getAllByRole(row, "cell");
          expect(tds[2]).toHaveTextContent(`${matchingTarget.cpu}`);
          expect(tds[3]).toHaveTextContent(`${matchingTarget.memory}`);
        });
      });

      test("lists total runs", () => {
        expect(screen.getByTestId("totalRuns")).toHaveTextContent(
          `${(MOCK_HARDWARE_TARGETS.length - 1) * 2}`
        );
      });
    });
  });
});

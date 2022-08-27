import SelectPane from "./SelectPane";
import {
  render,
  screen,
  getAllByRole,
  getByRole,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("SelectPane", () => {
  test("renders a checkbox with the title as an associated label", () => {
    render(
      <SelectPane
        name="my-panel"
        title="My Panel"
        description="My panel does all these cool things!"
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByLabelText("My Panel")).toEqual(
      screen.getByRole("checkbox")
    );
  });

  test("renders the description", () => {
    const description = "Descriptions are the best!";
    render(
      <SelectPane
        name="my-panel"
        title="My Panel"
        description={description}
        onSelect={jest.fn()}
      />
    );
    screen.getByText(description);
  });

  describe("when panel is selected", () => {
    test("checkbox is checked", () => {
      render(
        <SelectPane
          name="my-panel"
          title="My Panel"
          description="I am checked!"
          onSelect={jest.fn()}
          selected={true}
        />
      );
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    describe("on modifying the checkbox", () => {
      test("calls `onSelect` with the name and indication the checkbox is no longer checked", async () => {
        const onSelect = jest.fn();
        render(
          <SelectPane
            name="checkMe"
            title="My Panel"
            description="My panel does all these cool things!"
            onSelect={onSelect}
            selected={true}
          />
        );
        await user.click(screen.getByRole("checkbox"));

        expect(onSelect).toHaveBeenCalledWith("checkMe", false);
      });
    });
  });

  describe("when panel is not selected", () => {
    test("checkbox is not checked", () => {
      render(
        <SelectPane
          name="my-panel"
          title="My Panel"
          description="I am NOT checked!"
          onSelect={jest.fn()}
          selected={false}
        />
      );
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    describe("on modifying the checkbox", () => {
      test("calls `onSelect` with the name and indication the checkbox is now checked", async () => {
        const onSelect = jest.fn();
        render(
          <SelectPane
            name="checkMe"
            title="My Panel"
            description="My panel does all these cool things!"
            onSelect={onSelect}
            selected={false}
          />
        );
        await user.click(screen.getByRole("checkbox"));

        expect(onSelect).toHaveBeenCalledWith("checkMe", true);
      });
    });
  });
});

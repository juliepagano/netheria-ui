import Select from "./Select";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("Select", () => {
  it("selects the item specified in `value`", () => {
    const optionConfig = [
      {
        value: "1",
        label: "Hello",
      },
      {
        value: "2",
        label: "Good morning",
      },
      {
        value: "3",
        label: "Good day!",
      },
    ];
    render(
      <Select
        name="greeting"
        options={optionConfig}
        value="2"
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByRole("combobox")).toHaveValue("2");
  });

  describe("on select", () => {
    it("calls `onSelect` with the name and new selected value", async () => {
      const optionConfig = [
        { value: "one", label: "First" },
        { value: "two", label: "Second" },
      ];
      const onSelect = jest.fn();
      render(
        <Select name="ordering" options={optionConfig} onSelect={onSelect} />
      );
      await user.selectOptions(screen.getByRole("combobox"), ["two"]);
      expect(onSelect).toHaveBeenCalledWith("ordering", "two");
    });
  });

  describe("with a placeholder", () => {
    it("renders the placeholder as the first option value an empty value", () => {
      const optionConfig = [{ value: "one" }, { value: "two" }];
      const placeholder = "Pick something";

      render(
        <Select
          name="mySelect"
          placeholder={placeholder}
          options={optionConfig}
          onSelect={jest.fn()}
        />
      );
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(optionConfig.length + 1);

      // Placeholder is first option
      expect(options[0]).toHaveTextContent(placeholder);

      // Followed by specified options
      options.slice(1).forEach((option, i) => {
        expect(option).toHaveTextContent(optionConfig[i].value);
      });
    });
  });
});

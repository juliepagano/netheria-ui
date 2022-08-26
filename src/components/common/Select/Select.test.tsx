import Select from "./Select";
import { render, screen } from "@testing-library/react";

describe("Select", () => {
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

import Select from "./Select";
import { render, screen } from "@testing-library/react";

describe("Select", () => {
  describe("with a placeholder", () => {
    it("renders the placeholder as the first option value an empty value", () => {
      const optionConfig = [{ value: "one" }, { value: "two" }];
      render(
        <Select
          name="mySelect"
          placeholder="Pick something"
          options={optionConfig}
          onSelect={jest.fn()}
        />
      );
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
    });
  });
});

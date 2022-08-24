import { SelectHTMLAttributes, useEffect } from "react";

type SelectOption = {
  label?: string;
  value: string;
};

export type SelectProps = {
  name: string;
  options: SelectOption[];
  value: string | number | undefined;

  // TODO: need to fix some typing here.
  onSelect: (name: string, value: unknown) => void;
};

const Select = ({ options, name, value, onSelect }: SelectProps) => {
  const handleOnChange: SelectHTMLAttributes<HTMLSelectElement>["onChange"] = (
    e
  ) => {
    onSelect(name, e.target.value);
  };

  return (
    <select onChange={handleOnChange} name={name} value={value}>
      {options.map(({ value, label }) => {
        return (
          <option key={value} value={value}>
            {label || value}
          </option>
        );
      })}
    </select>
  );
};

export default Select;

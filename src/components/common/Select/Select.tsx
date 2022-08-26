import { SelectHTMLAttributes, useEffect } from "react";
import DownSvg from "../../../../public/down.svg";

import styles from "./Select.module.scss";

type SelectOption = {
  label?: string;
  value: string;
};

export type SelectProps = {
  name: string;
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  onSelect: (name: string, value?: string | number) => void;
};

const Select = ({
  options,
  name,
  value,
  placeholder,
  onSelect,
}: SelectProps) => {
  const handleOnChange: SelectHTMLAttributes<HTMLSelectElement>["onChange"] = (
    e
  ) => {
    onSelect(name, e.target.value);
  };

  return (
    <select
      onChange={handleOnChange}
      name={name}
      value={value}
      className={styles.root}
      style={{
        background: `url(${DownSvg.src}) no-repeat right 16px center`,
      }}
    >
      {placeholder && <option>{placeholder}</option>}
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

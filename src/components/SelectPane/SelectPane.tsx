import { InputHTMLAttributes, useId } from "react";

import styles from "./SelectPane.module.scss";

export type SelectPaneProps = {
  name: string;
  title: string;
  description: string;
  selected?: boolean;
  onSelect: (name: string, selected: boolean) => void;
};

const SelectPane = ({
  name,
  title,
  description,
  selected,
  onSelect,
}: SelectPaneProps) => {
  const inputId = useId();

  const handleOnChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
    onSelect(name, !selected);
  };

  return (
    <div className={styles.root}>
      <input
        id={inputId}
        type="checkbox"
        name={name}
        checked={selected}
        onChange={handleOnChange}
      />
      <div>
        <label htmlFor={inputId}>{title}</label>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default SelectPane;

import SelectPane, { SelectPaneProps } from "../SelectPane";
import HardwareTargets from "../HardwareTargets";
import { useState } from "react";

import styles from "./OctomizeContainer.module.scss";

type PaneState = Record<string, boolean>;

const PANE_CONFIG: Omit<SelectPaneProps, "onSelect">[] = [
  {
    name: "benchmark",
    title: "Benchmark",
    description:
      "Easily compare the performance of any model across various cloud CPU and GPU instance typess.",
  },
  {
    name: "accelerate",
    title: "Accelerate",
    description:
      "Use machine learning to explore all the possible optimizations available for your specific target hardware and pick the most performant ones.",
  },
];

const INIT_PANE_STATE = Object.fromEntries(
  PANE_CONFIG.map(({ name }) => [name, false])
);

const OctomizeContainer = () => {
  const [selectedPanes, setSelectedPanes] =
    useState<PaneState>(INIT_PANE_STATE);

  const onSelectPane: SelectPaneProps["onSelect"] = (name, selected) => {
    setSelectedPanes((prevSelectedPanes) => {
      return {
        ...prevSelectedPanes,
        [name]: selected,
      };
    });
  };

  return (
    <section className={styles.root}>
      <header>
        <h2>Octomize</h2>
      </header>
      {PANE_CONFIG.map((pane) => {
        return (
          <SelectPane
            key={pane.name}
            {...pane}
            selected={selectedPanes[pane.name]}
            onSelect={onSelectPane}
          />
        );
      })}
      <HardwareTargets />
    </section>
  );
};
export default OctomizeContainer;

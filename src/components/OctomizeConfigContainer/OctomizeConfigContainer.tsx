import SelectPane, { SelectPaneProps } from "../SelectPane";
import HardwareTargets, { HardwareTargetsProps } from "../HardwareTargets";
import { useState } from "react";

import styles from "./OctomizeConfigContainer.module.scss";

type PaneState = Record<string, boolean>;

type OctomizeConfigContainerProps = Pick<
  HardwareTargetsProps,
  "availableTargets" | "targets"
> & {
  onModifyHardwareTarget: HardwareTargetsProps["onModify"];
  onAddHardwareTarget: HardwareTargetsProps["onAdd"];
  onRemoveHardwareTarget: HardwareTargetsProps["onRemove"];

  actions: OctomizeActionOptions;
  onChangeAction: (name: OctomizeActionType, newValue: OctomizeAction) => void;
};

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

const OctomizeConfigContainer = ({
  actions,
  onChangeAction,
  onAddHardwareTarget: onAddHardwareTargets,
  onModifyHardwareTarget: onModifyHardwareTargets,
  onRemoveHardwareTarget: onRemoveHardwareTargets,
  ...otherHardwareProps
}: OctomizeConfigContainerProps) => {
  const onSelectPane: SelectPaneProps["onSelect"] = (name, selected) => {
    onChangeAction(name as OctomizeActionType, {
      selected,
    });
  };

  return (
    <section className={styles.root}>
      <header>
        <h3>Octomize</h3>
      </header>
      {PANE_CONFIG.map((pane) => {
        return (
          <SelectPane
            key={pane.name}
            {...pane}
            selected={!!actions[pane.name as OctomizeActionType]?.selected}
            onSelect={onSelectPane}
          />
        );
      })}
      <HardwareTargets
        {...otherHardwareProps}
        onAdd={onAddHardwareTargets}
        onRemove={onRemoveHardwareTargets}
        onModify={onModifyHardwareTargets}
      />
    </section>
  );
};
export default OctomizeConfigContainer;

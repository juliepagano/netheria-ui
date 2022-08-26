import { getHardwareTargets } from "../../services/internalService";
import { useEffect, useState } from "react";
import HardwareTargetsTable, {
  HardwareTargetsTableProps,
} from "./HardwareTargetsTable";

import styles from "./HardwareTargets.module.scss";

export type HardwareTargetsProps = Pick<
  HardwareTargetsTableProps,
  "availableTargets" | "targets" | "onModify" | "onRemove"
> & {
  onAdd: () => void;
};

const HardwareTargets = ({
  availableTargets,
  targets,
  onAdd,
  onModify,
  onRemove,
}: HardwareTargetsProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <h4>Hardware targets</h4>
        <button type="button" onClick={onAdd}>
          Add
        </button>
      </div>
      {availableTargets && (
        <HardwareTargetsTable
          availableTargets={availableTargets}
          targets={targets}
          onRemove={onRemove}
          onModify={onModify}
        />
      )}
    </div>
  );
};

export default HardwareTargets;

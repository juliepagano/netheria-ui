import { getHardwareTargets } from "../../services/internalService";
import { useEffect, useState } from "react";
import HardwareTargetsTable, {
  HardwareTargetsTableProps,
} from "./HardwareTargetsTable";

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
    <section>
      <h3>Hardware targets</h3>
      <button type="button" onClick={onAdd}>
        add
      </button>
      {availableTargets && (
        <HardwareTargetsTable
          availableTargets={availableTargets}
          targets={targets}
          onRemove={onRemove}
          onModify={onModify}
        />
      )}
    </section>
  );
};

export default HardwareTargets;

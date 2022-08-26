import HardwareTargetRow from "./HardwareTargetRow";

import styles from "./HardwareTargets.module.scss";

export type HardwareTargetsTableProps = {
  availableTargets: HardwareTargetOptions;
  targets: SelectedHardwareTarget[];
  onRemove: (id: number) => void;
  onModify: (
    id: number,
    property: string,
    value: string | number | undefined
  ) => void;
};

const HardwareTargetsTable = ({
  targets,
  availableTargets,
  onRemove,
  onModify,
}: HardwareTargetsTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.primaryHeader}>Provider</th>
          <th>Instance</th>
          <th>VCPU</th>
          <th>Memory (GiB)</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {targets.map((target) => {
          return (
            <HardwareTargetRow
              key={target.id}
              {...target}
              availableTargets={availableTargets}
              onRemove={onRemove}
              onModify={onModify}
            />
          );
        })}
      </tbody>
    </table>
  );
};
export default HardwareTargetsTable;

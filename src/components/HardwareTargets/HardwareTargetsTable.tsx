import HardwareTargetRow from "./HardwareTargetRow";
import cx from "classnames";

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
          <th className={cx(styles.primaryHeader, styles.selectCell)}>
            Provider
          </th>
          <th className={styles.selectCell}>Instance</th>
          <th className={styles.numberCell}>VCPU</th>
          <th className={styles.numberCell}>Memory (GiB)</th>
          <th className={styles.removeCell} />
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

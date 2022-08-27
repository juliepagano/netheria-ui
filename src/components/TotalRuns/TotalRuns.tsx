import Button from "../common/Button";

import styles from "./TotalRuns.module.scss";

type TotalRunsProps = {
  targets: SelectedHardwareTarget[];
  actions: OctomizeActionOptions;
};

const TotalRuns = ({ targets, actions }: TotalRunsProps) => {
  const validTargets = targets.filter(
    (target) =>
      target.provider && target.instance && target.cpu && target.memory
  );

  const totalTargets = validTargets.length;
  const totalActions = Object.values(actions).filter((a) => a.selected).length;
  const totalRuns = totalTargets * totalActions;

  return (
    <section className={styles.root}>
      <div className={styles.label}>Total Runs</div>
      <div className={styles.totalValue} data-test-id="totalRuns">
        {totalRuns}
      </div>
      <ul>
        {validTargets.map((target) => {
          return (
            <li key={target.id}>
              <div>
                <div className={styles.entryLabel}>{target.instance}</div>
                <div className={styles.entrySubtitle}>{target.cpu} cores</div>
              </div>
              <div className={styles.entryCount}>{totalActions}</div>
            </li>
          );
        })}
      </ul>
      <Button disabled={totalRuns <= 0} size={"large"}>
        Octomize
      </Button>
    </section>
  );
};
export default TotalRuns;

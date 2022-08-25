import styles from "./TotalRuns.module.scss";

type TotalRunsProps = {
  targets: SelectedHardwareTarget[];
};

const TotalRuns = ({ targets }: TotalRunsProps) => {
  const validTargets = targets.filter(
    (target) =>
      target.provider && target.instance && target.cpu && target.memory
  );

  return (
    <section className={styles.root}>
      <h2>Total Runs: {validTargets.length}</h2>
      <ul>
        {validTargets.map((target) => {
          return (
            <li key={target.id}>
              <div>{target.instance}</div>
              <div>{target.cpu} cores</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default TotalRuns;

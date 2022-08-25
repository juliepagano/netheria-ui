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
  const TotalRuns = totalTargets * totalActions;

  return (
    <section className={styles.root}>
      <h2>Total Runs: {TotalRuns}</h2>
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
      {TotalRuns > 0 && <button type="button">Octomize</button>}
    </section>
  );
};
export default TotalRuns;

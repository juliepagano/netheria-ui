import HardwareTargetRow from "./HardwareTargetRow";

export type SelectedHardwareTarget = Partial<HardwareTarget> & {
  id: number;
};

export type HardwareTargetsTableProps = {
  availableTargets: HardwareTarget[];
  targets: SelectedHardwareTarget[];
  onRemove: (id: number) => void;
};

const HardwareTargetsTable = ({
  targets,
  availableTargets,
  onRemove,
}: HardwareTargetsTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
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
                onRemove={onRemove}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default HardwareTargetsTable;

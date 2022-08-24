import HardwareTargetRow from "./HardwareTargetRow";

export type SelectedHardwareTarget = Partial<HardwareTarget> & {
  id: number;
};

// Shape of hardware targets easier to work with for selecting options.
type HardwareTargetOptions = Record<
  HardwareProvider,
  Record<
    HardwareTarget["instance"],
    Omit<HardwareTarget, "provider" | "instance">
  >
>;

export type HardwareTargetsTableProps = {
  availableTargets: HardwareTargetOptions;
  targets: SelectedHardwareTarget[];
  onRemove: (id: number) => void;
  onModify: (id: number, property: string, value: unknown) => void;
};

const HardwareTargetsTable = ({
  targets,
  availableTargets,
  onRemove,
  onModify,
}: HardwareTargetsTableProps) => {
  console.log(targets);

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
                availableTargets={availableTargets}
                onRemove={onRemove}
                onModify={onModify}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default HardwareTargetsTable;

import HardwareTargetsTable, {
  HardwareTargetsTableProps,
} from "./HardwareTargetsTable";
import Select, { SelectProps } from "../common/Select";

type HardwareTargetRowProps = HardwareTargetsTableProps["targets"][number] &
  Pick<HardwareTargetsTableProps, "onRemove" | "onModify" | "availableTargets">;

const HardwareTargetRow = ({
  id,
  provider,
  instance,
  cpu,
  memory,
  onRemove,
  onModify,
  availableTargets,
}: HardwareTargetRowProps) => {
  const handleRemove = () => {
    onRemove(id);
  };

  const handleSetProviderValue: SelectProps["onSelect"] = (name, value) => {
    onModify(id, name, value);
  };

  const providerOptions = Object.keys(availableTargets).map((provider) => {
    return {
      value: provider,
    };
  });

  const instanceOptions =
    provider &&
    availableTargets[provider] &&
    Object.keys(availableTargets[provider]).map((instance) => {
      return {
        value: instance,
      };
    });

  return (
    <tr>
      <td>
        <Select
          options={providerOptions}
          placeholder="Select Placeholder"
          name="provider"
          onSelect={handleSetProviderValue}
          value={provider}
        />
      </td>
      <td>
        {instanceOptions && (
          <Select
            options={instanceOptions}
            placeholder="Select Instance"
            name="instance"
            onSelect={handleSetProviderValue}
            value={instance}
          />
        )}
      </td>
      <td>{cpu}</td>
      <td>{memory}</td>
      <td>
        <button type="button" onClick={handleRemove}>
          remove
        </button>
      </td>
    </tr>
  );
};
export default HardwareTargetRow;

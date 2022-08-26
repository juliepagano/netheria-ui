import RemoveSvg from "../../../public/remove.svg";
import Image from "next/image";

import styles from "./HardwareTargets.module.scss";

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
      <td className={styles.selectCell}>
        <Select
          options={providerOptions}
          placeholder="Select Provider"
          name="provider"
          onSelect={handleSetProviderValue}
          value={provider}
        />
      </td>
      <td className={styles.selectCell}>
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
      <td className={styles.numberCell}>{cpu}</td>
      <td className={styles.numberCell}>{memory}</td>
      <td className={styles.removeCell}>
        <button type="button" onClick={handleRemove}>
          <Image src={RemoveSvg} alt="remove" />
        </button>
      </td>
    </tr>
  );
};
export default HardwareTargetRow;

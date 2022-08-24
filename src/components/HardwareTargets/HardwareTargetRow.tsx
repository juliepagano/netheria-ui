import HardwareTargetsTable, {
  HardwareTargetsTableProps,
} from "./HardwareTargetsTable";

type HardwareTargetRowProps = HardwareTargetsTableProps["targets"][number] &
  Pick<HardwareTargetsTableProps, "onRemove">;

const HardwareTargetRow = ({
  id,
  provider,
  instance,
  cpu,
  memory,
  onRemove,
}: HardwareTargetRowProps) => {
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <tr>
      <td>{provider || "select provider"}</td>
      <td>{instance}</td>
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

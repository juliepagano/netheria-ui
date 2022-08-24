import { getHardwareTargets } from "../../services/internalService";
import { useEffect, useState } from "react";
import HardwareTargetsTable, {
  HardwareTargetsTableProps,
} from "./HardwareTargetsTable";

const HardwareTargets = () => {
  const [availableTargets, setAvailableTargets] = useState<HardwareTarget[]>();
  const [targets, setTargets] = useState<HardwareTargetsTableProps["targets"]>([
    {
      id: 0,
    },
  ]);

  useEffect(() => {
    const fetchHardwareTargets = async () => {
      const results = await getHardwareTargets();

      setAvailableTargets(results);
    };

    fetchHardwareTargets();
  }, []);

  const handleAdd = () => {
    setTargets((prevTargets) => {
      return [
        ...prevTargets,
        {
          id: prevTargets.length + 1,
        },
      ];
    });
  };

  const handleRemove = (id: number) => {
    setTargets((prevTargets) => {
      return [...prevTargets].filter((target) => target.id !== id);
    });
  };

  return (
    <section>
      <h3>Hardware targets</h3>
      <button type="button" onClick={handleAdd}>
        add
      </button>
      {availableTargets && (
        <HardwareTargetsTable
          availableTargets={availableTargets}
          targets={targets}
          onRemove={handleRemove}
        />
      )}
    </section>
  );
};

export default HardwareTargets;

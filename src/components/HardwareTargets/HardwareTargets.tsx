import { getHardwareTargets } from "../../services/internalService";
import { useEffect, useState } from "react";
import HardwareTargetsTable, {
  HardwareTargetsTableProps,
} from "./HardwareTargetsTable";

const HardwareTargets = () => {
  const [availableTargets, setAvailableTargets] =
    useState<HardwareTargetsTableProps["availableTargets"]>();
  const [targets, setTargets] = useState<HardwareTargetsTableProps["targets"]>([
    {
      id: 0,
    },
  ]);

  useEffect(() => {
    const fetchHardwareTargets = async () => {
      const targetResults = await getHardwareTargets();

      const targetResultMap: HardwareTargetsTableProps["availableTargets"] =
        targetResults.reduce(
          (resultMap, { provider, instance, ...otherTarget }) => {
            if (!resultMap[provider]) {
              resultMap[provider] = {};
            }
            resultMap[provider][instance] = otherTarget;

            return resultMap;
          },
          {} as HardwareTargetsTableProps["availableTargets"]
        );

      setAvailableTargets(targetResultMap);
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

  const handleModify: HardwareTargetsTableProps["onModify"] = (
    id,
    property,
    newValue
  ) => {
    setTargets((prevTargets) => {
      return prevTargets.map((target) => {
        if (target.id === id) {
          // This isn't quite correct.
          // TODO: add logic for reset cases and setting machine specs.
          return {
            ...target,
            [property]: newValue,
          };
        }
        return target;
      });
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
          onModify={handleModify}
        />
      )}
    </section>
  );
};

export default HardwareTargets;

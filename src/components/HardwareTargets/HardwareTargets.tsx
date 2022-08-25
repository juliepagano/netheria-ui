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
          // TODO: this is pretty yucky and could use cleaning up.
          if (property === "provider" && typeof newValue === "string") {
            // Reset other values because the provider changed.
            return {
              id: target.id,
              // NOTE: I know this isn't the best TS practice, but for the
              // purposes of this exercise, I don't want to do a bunch of
              // fighting with generics to do this the "right" way.
              provider: newValue as HardwareProvider,
            };
          }
          if (
            availableTargets &&
            property === "instance" &&
            typeof newValue === "string" &&
            target.provider
          ) {
            const instance = availableTargets[target.provider][newValue];

            return {
              ...target,
              instance: newValue,
              cpu: instance.cpu,
              memory: instance.memory,
            };
          }
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

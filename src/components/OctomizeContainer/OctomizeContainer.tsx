import OctomizeConfigContainer from "../OctomizeConfigContainer";
import TotalRuns from "../TotalRuns";
import { useEffect, useState } from "react";
import { getHardwareTargets } from "../../services/internalService";
import { HardwareTargetsTableProps } from "../HardwareTargets/HardwareTargetsTable";

const OctomizeContainer = () => {
  const [availableTargets, setAvailableTargets] =
    useState<HardwareTargetOptions>();
  const [targets, setTargets] = useState<SelectedHardwareTarget[]>([
    {
      id: 0,
    },
  ]);

  useEffect(() => {
    const fetchHardwareTargets = async () => {
      const targetResults = await getHardwareTargets();

      const targetResultMap: HardwareTargetOptions = targetResults.reduce(
        (resultMap, { provider, instance, ...otherTarget }) => {
          if (!resultMap[provider]) {
            resultMap[provider] = {};
          }
          resultMap[provider][instance] = otherTarget;

          return resultMap;
        },
        {} as HardwareTargetOptions
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
    <div>
      {availableTargets && (
        <>
          <OctomizeConfigContainer
            availableTargets={availableTargets}
            targets={targets}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onModify={handleModify}
          />
          <TotalRuns targets={targets} />
        </>
      )}
    </div>
  );
};
export default OctomizeContainer;

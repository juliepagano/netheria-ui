import OctomizeConfigContainer from "../OctomizeConfigContainer";
import TotalRuns from "../TotalRuns";
import { useEffect, useState } from "react";
import { getHardwareTargets } from "../../services/internalService";
import { HardwareTargetsTableProps } from "../HardwareTargets/HardwareTargetsTable";
import { SelectPaneProps } from "../SelectPane";

import styles from "./OctomizeContainer.module.scss";

const INIT_ACTION_STATE: OctomizeActionOptions = {
  benchmark: {
    selected: false,
  },
  accelerate: {
    selected: false,
  },
};

const OctomizeContainer = () => {
  const [availableTargets, setAvailableTargets] =
    useState<HardwareTargetOptions>();
  const [targets, setTargets] = useState<SelectedHardwareTarget[]>([
    {
      id: 0,
    },
  ]);
  const [actions, setActions] =
    useState<OctomizeActionOptions>(INIT_ACTION_STATE);

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

  const handleAddHardwareTarget = () => {
    setTargets((prevTargets) => {
      return [
        ...prevTargets,
        {
          id: prevTargets.length + 1,
        },
      ];
    });
  };

  const handleModifyHardwareTarget: HardwareTargetsTableProps["onModify"] = (
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
          if (availableTargets && property === "instance" && target.provider) {
            if (typeof newValue === "string") {
              const instance = availableTargets[target.provider][newValue];
              if (instance) {
                return {
                  ...target,
                  instance: newValue,
                  cpu: instance.cpu,
                  memory: instance.memory,
                };
              }
            }

            return {
              id: target.id,
              provider: target.provider,
              // Leave the rest undefined because the instance is being unset.
            };
          }
        }
        return target;
      });
    });
  };

  const handleRemoveHardwareTarget = (id: number) => {
    setTargets((prevTargets) => {
      return [...prevTargets].filter((target) => target.id !== id);
    });
  };

  const handleModifyAction = (
    name: OctomizeActionType,
    newValue: OctomizeAction
  ) => {
    setActions((prevActions) => {
      return {
        ...prevActions,
        [name]: newValue,
      };
    });
  };

  return (
    <div className={styles.root}>
      {availableTargets && (
        <>
          <OctomizeConfigContainer
            availableTargets={availableTargets}
            targets={targets}
            onAddHardwareTarget={handleAddHardwareTarget}
            onRemoveHardwareTarget={handleRemoveHardwareTarget}
            onModifyHardwareTarget={handleModifyHardwareTarget}
            actions={actions}
            onChangeAction={handleModifyAction}
          />
          <TotalRuns targets={targets} actions={actions} />
        </>
      )}
    </div>
  );
};
export default OctomizeContainer;

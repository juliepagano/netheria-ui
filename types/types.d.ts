type HardwareProvider = "AWS" | "GCP" | "Azure";

type HardwareTarget = {
  provider: HardwareProvider;
  instance: string;
  cpu: number;
  memory: number;
};

// Shape of hardware targets easier to work with for selecting options.
type HardwareTargetOptions = Record<
  HardwareProvider,
  Record<
    HardwareTarget["instance"],
    Omit<HardwareTarget, "provider" | "instance">
  >
>;

type SelectedHardwareTarget = Partial<HardwareTarget> & {
  id: number;
};

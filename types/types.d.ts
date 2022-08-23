type HardwareProvider = "AWS" | "GCP" | "Azure";

type HardwareTarget = {
  provider: HardwareProvider;
  instance: string;
  cpu: number;
  memory: number;
};

// This would probably be querying a backend in a real project. For the sake of
// this exercise, I am simulating a backend with Next.js api routes.

export const getHardwareTargets = async (): Promise<HardwareTarget[]> => {
  const response = await fetch("/api/hardwareTargets");
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject("Something went wrong retrieving hardware targets.");
  }
};

type SubmitOctomizeOps = {
  targets: SelectedHardwareTarget[];
  actions: OctomizeActionOptions;
};

export const submitOctomize = async (
  ops: SubmitOctomizeOps
): Promise<OctomizeResponse> => {
  const response = await fetch("/api/octomize", {
    method: "POST",
    body: JSON.stringify(ops),
  });

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject("Something went wrong Octomizing.");
  }
};

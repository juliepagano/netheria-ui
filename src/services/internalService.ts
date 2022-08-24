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

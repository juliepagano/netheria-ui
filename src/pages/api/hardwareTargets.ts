// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const mockHardwareTargets = [
  {
    provider: "AWS",
    instance: "m4.large",
    cpu: 2,
    memory: 8,
  },
  {
    provider: "AWS",
    instance: "m4.xlarge",
    cpu: 4,
    memory: 16,
  },
  {
    provider: "AWS",
    instance: "m4.2xlarge",
    cpu: 8,
    memory: 32,
  },
  {
    provider: "AWS",
    instance: "m4.4xlarge",
    cpu: 16,
    memory: 64,
  },
  {
    provider: "GCP",
    instance: "n2-standard-2",
    cpu: 2,
    memory: 8,
  },
  {
    provider: "GCP",
    instance: "n2-standard-4",
    cpu: 4,
    memory: 16,
  },
  {
    provider: "GCP",
    instance: "n2-standard-8",
    cpu: 8,
    memory: 32,
  },
  {
    provider: "GCP",
    instance: "n2-standard-16",
    cpu: 16,
    memory: 64,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ targets: mockHardwareTargets });
}

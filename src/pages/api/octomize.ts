// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OctomizeResponse>
) {
  const payload = JSON.parse(req.body);
  console.log("Octomizing!");
  console.log(payload);

  // Introduce a fake delay to make it seem like something is happening here.
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });

  res.status(200).json({
    result: "Success!",
  });
}

import { cloudEvent, http } from "@google-cloud/functions-framework";

export function extractObjectSummary(event) {
  const data = event.data ?? {};

  return {
    bucket: data.bucket,
    name: data.name,
    contentType: data.contentType,
    size: Number(data.size ?? 0),
    generation: data.generation,
    metageneration: data.metageneration,
    timeCreated: data.timeCreated
  };
}

export async function handleStorageUpload(cloudEvent) {
  const summary = extractObjectSummary(cloudEvent);

  if (!summary.bucket || !summary.name) {
    throw new Error("Invalid storage event payload.");
  }

  console.log(
    JSON.stringify({
      message: "Cloud Storage object finalized",
      summary
    })
  );

  return summary;
}

cloudEvent("handleStorageUpload", handleStorageUpload);

http("healthcheck", async (_request, response) => {
  response.status(200).json({ ok: true });
});

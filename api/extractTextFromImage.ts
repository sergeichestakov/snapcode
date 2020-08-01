import { GOOGLE_CLOUD_VISION_API_KEY } from "@env";

const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`;

export default async function extractTextFromImage(
  encoded: string
): Promise<string | null> {
  const body = JSON.stringify({
    requests: [
      {
        features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        image: {
          content: encoded,
        },
      },
    ],
  });

  const response = await fetch(VISION_API_URL, {
    headers: {
      Accept: "applicationjson",
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  });

  const json = await response.json();

  if (!json.responses?.length || !json.responses[0].textAnnotations?.length) {
    return null;
  }

  return json.responses[0].textAnnotations[0].description;
}

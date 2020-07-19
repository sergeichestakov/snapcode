import { GOOGLE_CLOUD_VISION_API_KEY } from "@env";

const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`;

export default async function extractTextFromImage(uri: string): Promise<any> {
  const body = JSON.stringify({
    requests: [
      {
        features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        image: {
          source: {
            imageUri: uri,
          },
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
  return json.responses[0].textAnnotations[0].description;
}

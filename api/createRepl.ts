import { REPLIT_API_KEY } from "@env";

const REPLIT_API_URL = `https://repl.it/api/v0/repls`;

interface Options {
  language?: string;
  title?: string;
  description?: string;
  files?: File[];
}

interface File {
  name: string;
  content: string;
}

interface Response {
  id: string;
  url: string;
  title: string;
  description: string;
  language: string;
}

export default async function createRepl(
  options: Options
): Promise<Response | null> {
  // language and title are required fields
  const language = options.language || "python3";
  const title =
    options.title || `Test${Math.floor(Math.random() * 1000000 + 1)}`;

  const body = JSON.stringify({
    ...options,
    apiKey: REPLIT_API_KEY,
    language,
    title,
  });

  const response = await fetch(REPLIT_API_URL, {
    headers: {
      Accept: "applicationjson",
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  });

  try {
    return await response.json();
  } catch (error) {
    console.error("received error: ", error);
    return null;
  }
}

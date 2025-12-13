import { GoogleGenAI, Type } from "@google/genai";
import { AppConfig } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePwaCode = async (config: AppConfig) => {
  const ai = getClient();
  const prompt = `
    You are an expert Senior Frontend Engineer. Generate the code for a Progressive Web App (PWA) based on the following configuration:
    ${JSON.stringify(config, null, 2)}

    Please return a JSON object containing the file contents for:
    1. manifest.json (Standard PWA manifest)
    2. index.html (A beautiful, modern, responsive landing page using Tailwind CSS that matches the description. If the description is in Marathi, ensure the landing page text is also in Marathi)
    3. sw.js (A robust service worker for caching assets)
    4. netlify.toml (Configuration for Netlify deployment with correct headers)
    5. privacy-policy.md (A standard privacy policy for Play Store submission)

    The index.html should be complete with <html>, <head>, <body> tags.
    The service worker should use a cache-first strategy for images and stale-while-revalidate for other requests.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          manifest: { type: Type.STRING },
          indexHtml: { type: Type.STRING },
          serviceWorker: { type: Type.STRING },
          netlifyToml: { type: Type.STRING },
          privacyPolicy: { type: Type.STRING }
        },
        required: ['manifest', 'indexHtml', 'serviceWorker', 'netlifyToml', 'privacyPolicy']
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateAppIcon = async (description: string, color: string) => {
  const ai = getClient();
  const prompt = `Design a modern, minimalist, high-quality app icon for a mobile application described as: "${description}". The primary theme color is ${color}. The icon should be simple, recognizable, and suitable for Android and iOS home screens. Flat design, vector style, centered on a solid background of the theme color.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: prompt,
  });

  // Extract image
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const analyzeErrorLog = async (errorLog: string, context: string) => {
  const ai = getClient();
  const prompt = `
    I am building a PWA and deploying to Netlify/Play Store using PWABuilder.
    I encountered the following error:
    
    \`\`\`
    ${errorLog}
    \`\`\`

    Context: ${context}

    Please analyze this error and provide a step-by-step solution.
    If the user communicates in Marathi, please respond in Marathi.
    
    If this is a Netlify build error, explain how to fix the build settings or code.
    If this is a Play Store/Bubblewrap/PWA Builder error (like AssetLinks, Digital Asset Links, SHA-256 fingerprints), explain exactly how to generate the fingerprint and where to put it in assetlinks.json.
    Respond in a helpful, encouraging tone.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text;
};

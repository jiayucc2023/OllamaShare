
import { GoogleGenAI } from "@google/genai";

export async function getIntegrationAdvice(techStack: string) {
  // Fix: Initialize GoogleGenAI inside the function to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain how to connect a local Ollama instance to a ${techStack} application. 
    Focus on API endpoints, CORS handling, and code snippets. 
    Ollama default port is 11434. Mention OLLAMA_ORIGINS="*" configuration.`,
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40
    }
  });
  
  // Fix: Directly access the .text property from the GenerateContentResponse
  return response.text;
}

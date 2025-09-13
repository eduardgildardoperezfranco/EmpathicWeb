import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBrainVideo = async (prompt: string): Promise<string> => {
    try {
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
            },
        });

        // Poll for the result
        while (!operation.done) {
            // Wait for 10 seconds before checking the status again
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (downloadLink) {
            // Append the API key to the download link to authenticate the request
            const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            if (!videoResponse.ok) {
                throw new Error(`Failed to download video: ${videoResponse.statusText}`);
            }
            const videoBlob = await videoResponse.blob();
            // Create a local URL for the browser to display the video
            return URL.createObjectURL(videoBlob);
        } else {
            throw new Error("Video generation failed, no download link was returned.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate video. Please check the prompt or try again later.");
    }
};
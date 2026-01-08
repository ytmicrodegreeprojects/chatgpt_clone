// this file creates a POST API route that streams text responses from OpenAI using the Vercel AI SDK.

import { streamText } from "ai";        // function to stream text responses
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request){
    try{
        const { prompt } = await req.json();  // extract the prompt from the request body

        const result = streamText({     // NOTE: here we are not awaiting stream text
            model: openai("gpt-4.1-nano"),
            prompt,
        });

        return result.toUIMessageStreamResponse();   // return the streaming response [toUIMessageStreamResponse() method creates a http response that streams data in the format that the UI can understand]
    }
    catch(error){
        console.error("Error streaming text:", error);
        return new Response("Failed to stream text", { status: 500 });
    }
    
}
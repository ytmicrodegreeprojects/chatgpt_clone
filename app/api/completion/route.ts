// This file defines a POST API route that talks to OpenAI using the Vercel AI SDK.

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request){
    try{
        const { prompt } =await req.json();  // extract the prompt from the request body

        // Ask OpenAI for a text response
        const { text} = await generateText({
            model: openai("gpt-4.1-nano"),
            prompt
        });

        // Send the generated text back as JSON
        return Response.json({ text });
    }
    catch(error){
        console.error("Error generating text:", error);
        return Response.json({ error: "Failed to generate text" }, { status: 500 });
    }
    
}
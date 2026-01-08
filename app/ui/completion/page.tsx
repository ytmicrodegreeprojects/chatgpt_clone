"use client";       // This is a client component that we make use of react state and handle interactivity 

import { useState } from "react";

export default function CompletionPage() {

    const [prompt, setPrompt] = useState("");       // user input 
    const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);   // chat history
    const [isLoading, setIsLoading] = useState(false);  // loading flag
    const [error, setError] = useState<string | null>(null); // error state

    const complete = async (e: React.FormEvent) => {
        e.preventDefault();   // prevent default form submission behavior

        const userMessage = prompt.trim();
        if (!userMessage) return;

        setIsLoading(true);   // set loading to true while waiting for response
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]); // add user message
        setPrompt("");      // clear input field

        try{    // make API call to our backend
            const response = await fetch("/api/completion", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ prompt: userMessage })
            })

            const data = await response.json();

            if(!response.ok){       // handle errors
                throw new Error(data.error || "Something went wrong");
            }
            setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);   // add AI response
        }
        catch(error){
            console.log("Error fetching completion:", error);
            setError(      
                error instanceof Error 
                    ? error.message 
                    : "Something went wrong. Please try again"
            );
        }
        finally{
            setIsLoading(false);  // reset loading flag
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 py-12">
            <div className="w-full max-w-2xl mx-4">
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 max-h-96 overflow-y-auto">
                        {/* Chat history */}
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md xl:max-w-lg ${
                                    message.role === 'user' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                                }`}>
                                    <div className="whitespace-pre-wrap">{message.content}</div>
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="text-left mb-4">
                                <div className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100">
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-900 dark:border-zinc-100 mr-2"></div>
                                        Thinking...
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error display */}
                        {error && <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>}
                    </div>

                    <form
                        onSubmit={complete}
                        className="p-4 bg-white dark:bg-zinc-800 border-t border-gray-100 dark:border-zinc-700"
                    >
                        <div className="flex gap-3 items-center">
                            <input
                                className="flex-1 dark:bg-zinc-900 p-3 border border-gray-200 dark:border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 text-zinc-900 dark:text-zinc-100"
                                placeholder="How can I help you?"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
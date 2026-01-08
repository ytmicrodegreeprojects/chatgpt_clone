"use client";       // This is a client component that we make use of react state and handle interactivity

import { useCompletion } from "@ai-sdk/react";  // hook to handle AI completions
import { useState, useEffect } from "react";

export default function StreamPage() {

    const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

    const { 
        input, 
        handleInputChange, 
        handleSubmit, 
        completion, 
        isLoading, 
        error, 
        setInput, 
        stop
    } = useCompletion({
        api: "/api/stream",    // API endpoint for streaming
    })

    // Add completion to messages when it finishes loading
    useEffect(() => {
        if (!isLoading && completion && completion.trim()) {
            setMessages(prev => [...prev, { role: 'assistant', content: completion }]);
        }
    }, [completion, isLoading]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userMessage = input.trim();
        if (!userMessage) return;

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput("");
        handleSubmit(e);
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

                        {/* Streaming completion */}
                        {isLoading && completion && (
                            <div className="text-left mb-4">
                                <div className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100">
                                    <div className="whitespace-pre-wrap">{completion}</div>
                                    <div className="inline-block w-2 h-4 bg-zinc-900 dark:bg-zinc-100 ml-1 animate-pulse"></div>
                                </div>
                            </div>
                        )}

                        {/* Error display */}
                        {error && <div className="text-red-600 dark:text-red-400 mb-4">{error.message}</div>}
                    </div>

                    <form
                        onSubmit={handleFormSubmit}
                        className="p-4 bg-white dark:bg-zinc-800 border-t border-gray-100 dark:border-zinc-700"
                    >
                        <div className="flex gap-3 items-end">
                            <input
                                className="flex-1 dark:bg-zinc-900 p-3 border border-gray-200 dark:border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 text-zinc-900 dark:text-zinc-100"
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={handleInputChange}
                            />

                            {isLoading ? (
                                <button
                                    onClick={stop}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Stop
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    Send
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
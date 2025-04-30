"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface correction {
    correction: string,
}

export default function Page() {
    const [formValue, setFormValue] = useState<string>("");
    const [correction, setCorrection] = useState<correction | null>(null);

    const inputWordAmount = formValue.split(" ").length;
    const outputWordsAmount = correction?.correction.split(" ").length;

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
        //cancel a default form beheviour
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        
        const res = await fetch(`${process.env.MY_API_URL}/ai/enhancer`, {
            method: "POST",
            body: formData,
        });

        const correctionData = await res?.json();
        console.log("Note correction", correctionData)
        setCorrection(correctionData);
    }
    
    return (
        <main className="max-w-6xl mx-auto px-4 lg:px-0 py-10">
            <div className="flex flex-col lg:flex-row gap-4 border border-gray-300 rounded-lg">
                <form 
                action="/" 
                onSubmit={handleFormSubmission}
                className="p-4 lg:w-1/2">
                    <textarea name="note" 
                    className="w-full h-52 lg:h-80 border-b border-gray-300 resize-none rounded-lg focus:outline-none" 
                    placeholder="Type your text here..."
                    onChange={
                        (e: React.FormEvent) => {
                            const target = e.target as HTMLTextAreaElement;
                            setFormValue(target.value);
                        }
                    }></textarea>
                    <div className="flex justify-between">
                        <p>Words: {inputWordAmount}</p>
                        <div>
                            <Button 
                            className="bg-indigo-800 hover:bg-indigo-900 rounded-full" 
                            type="submit">
                                Ehance
                            </Button>
                        </div>
                    </div>
                </form>
                    
                <div className="text-slate-800 rounded-lg p-4 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-gray-300">
                    <div className="h-52 lg:h-80 border-b border-gray-300">
                        <p className="">{correction?.correction}</p>
                    </div>
                    <div>
                        words: {outputWordsAmount}
                    </div>
                </div>
                
            </div>
            
        </main>
    )
}
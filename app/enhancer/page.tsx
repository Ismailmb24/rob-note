"use client";

import Enhancement from "@/components/Enhancement";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface correction {
    correction: string,
}

export default function Page() {
    const [formValue, setFormValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [correction, setCorrection] = useState<correction | null>(null);
    const [noValue, setNoValue] = useState<boolean>(false);
    const [toolow, setToolow] = useState<boolean>(false);
    const [toolong, setToolong] = useState<boolean>(false);

    const inputWordAmount = formValue.split(" ").length;
    const outputWordsAmount = correction?.correction.split(" ").length;

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
        //cancel a default form beheviour
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const note = formData.get("note") as string;
        console.log("Note", note);
        if (note.length < 1) {
            setNoValue(true);
            setLoading(false);
            return;
        }
    
        const res = await fetch(`/api/ai/enhancer`, {
            method: "POST",
            body: formData,
        });

        const correctionData = await res?.json();
        console.log("Note correction", correctionData)
        setCorrection(correctionData);
        if (res.status !== 200) {
            setError(true);
        }
        setLoading(false);
        setNoValue(false);
        setToolow(false);
        setToolong(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const value = target.value;
        setFormValue(value);
        setNoValue(false);

        if (value.length < 5) {
            setToolow(true);
            setLoading(false);
            return;
        }

        if (value.length > 500) {
            setToolong(true);
            setLoading(false);
            return;
        }

        setToolow(false);
        setToolong(false);
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
                    onChange={handleInputChange}></textarea>
                    {noValue && <p className="text-red-500 text-sm mt-2">Please enter a text</p>}
                    {toolow && <p className="text-red-500 text-sm mt-2">Text is too short</p>}
                    {toolong && <p className="text-red-500 text-sm mt-2">Text is too long</p>}
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
                    <Enhancement 
                    correction={correction} 
                    outputWordsAmount={outputWordsAmount}
                    loading={loading}
                    error={error} />
                </div>
                
            </div>
            
        </main>
    )
}
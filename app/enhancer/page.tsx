"use client";

import Enhancement from "@/components/Enhancement";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SelectTrigger } from "@radix-ui/react-select";
import { Languages, Pen, Repeat, Send, SendHorizonal, Sparkles, Stars, Terminal } from "lucide-react";
import { Rubik } from "next/font/google";
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
        const language = formData.get("language");
        const turn = formData.get("turn");
        
        
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
        // this set enhaced note loading to false to remove the loading ui
        setLoading(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const value = target.value;
        setFormValue(value);
    }

    
    return (
        <main className="w-full flex flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-2/3">
                <div className="text-slate-800">
                    <Enhancement 
                    correction={correction} 
                    loading={loading}
                    error={error} />
                </div>
            </div>

            <div>
                <Separator orientation="vertical"/>
            </div>
            
            <div className="flex flex-col w-full lg:w-1/3 lg:h-screen fixed bottom-1 lg:static">
                <form 
                action="/" 
                onSubmit={handleFormSubmission}
                className="p-4 w-full h-full">
                    <Textarea name="note" 
                    className="w-full max-h-52 lg:h-10/12 lg:max-h-10/12  border-b border-gray-300 resize-none rounded-lg focus:outline-none" 
                    placeholder="Type your text here..."
                    onChange={handleInputChange}
                    ></Textarea>
                    <div className="flex justify-between mt-5 items-center">
                        <div className="flex gap-5">
                            <Select name="language" defaultValue="default">
                                <SelectTrigger>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Languages className="h-4 w-4" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Language</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="englist">English</SelectItem>
                                    <SelectItem value="arabic">Arabic</SelectItem>
                                    <SelectItem value="hausa">Hausa</SelectItem>
                                    <SelectItem value="chinese">Chinese</SelectItem>
                                    <SelectItem value="hindie">Hindie</SelectItem>
                                    <SelectItem value="france">France</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select name="turn" defaultValue="default">
                                <SelectTrigger>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Repeat className="h-4 w-4" />  
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Turn</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="formal">Formal</SelectItem>
                                    <SelectItem value="casual">Casual</SelectItem>
                                </SelectContent>
                            </Select>
                            
                             <Tooltip>
                                <TooltipTrigger>
                                    <Terminal className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Custom prompt</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div>
                            <Button 
                            variant="secondary"
                            className="rounded-full" 
                            type="submit"
                            disabled={!formValue}>
                                <SendHorizonal className="text-indigo-500" />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </main>
    )
}
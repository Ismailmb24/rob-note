"use client";

import { StarsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import RegenerateExample from "./RegenerateExample";
import { Separator } from "./ui/separator";

export default function AiExample({ word }: { word: string }) {
    interface AiExampleData {
        error?: string;
        examples?: string[];
    }

    const [data, setData] = useState<AiExampleData | null>(null);
    const [toggle, setToggle] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/ai/examples?word=${word}`);
            const data = await res.json();
            setData(data);
        };
        fetchData();
    }, [toggle, word]);
    
    return (
        <div className="">
            <div className="flex items-center gap-20 mt-10">
                <h2 className="font-bold text-2xl flex gap-2">
                    <StarsIcon className="w-10 h-10 text-indigo-900" />
                    <p className="text-slate-900">AI Examples</p>
                </h2>
                <RegenerateExample toggle={setToggle} />
            </div>
                        <h1 className="text-2xl font-bold">{data?.error}</h1>
            <Separator className="my-4 bg-gray-400 w-full" />
            {
                data?.error ? (
                    <div className="text-center mt-10 flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold">{data?.error}</h1>
                        <p className="text-gray-500">Please try again later.</p>
                    </div>
                ) : (
                    <ul className="list-disc list-inside my-10">
                        {
                            data?.examples?.map((item: string, index: number) => (
                                <li key={index} className="text-slate-800 italic mt-3">
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                )
            }      
        </div>
    );
}
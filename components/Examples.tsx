"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Examples({ word, toggle }: { word: string, toggle: boolean }) {
    interface AiExampleData {
        error?: string;
        examples?: string[];
    }

    const [data, setData] = useState<AiExampleData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/ai/examples?word=${word}`);
            const data = await res.json();
            if (res.status !== 200) {
                setError(true);
            }
            setData(data);
            setLoading(false);
        };
        fetchData();
    }, [toggle, word]);

    if (loading) return (
        <div className="flex justify-center items-center h-50">
            <Loader className="animate-spin text-indigo-900" />
        </div>
    );

    if (error) return (
        <div className="text-center text-sm italic mt-10 flex flex-col justify-center items-center  h-[25vh]">
            <h1>Something went bad !!!</h1>
            <p className="text-gray-500">try again.</p>
        </div>
    );
    
    return (
        <ul className="list-disc list-inside my-10">
            {
                data?.examples?.map((item: string, index: number) => (
                    <li key={index} className="text-slate-800 italic mt-3">
                        {item}
                    </li>
                ))
            }
        </ul> 
    );
}
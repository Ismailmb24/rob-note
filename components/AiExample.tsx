"use client";

import { StarsIcon } from "lucide-react";
import { useState } from "react";
import RegenerateExample from "./RegenerateExample";
import { Separator } from "./ui/separator";
import Examples from "./Examples";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function AiExamples({ word }: { word: string }) {
    
    const [toggle, setToggle] = useState<boolean>(false);
    
    return (
        <div className="">
            <div className="flex items-center gap-20 mt-10">
                <h2 className="font-bold text-2xl flex gap-2">
                    <StarsIcon className="w-10 h-10 text-indigo-900" />
                    <p className="text-slate-900">AI Examples</p>
                </h2>
                <Tooltip>
                    <TooltipTrigger className="cursor-pointer">
                        <RegenerateExample toggle={setToggle} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-sm">Regenerate</p>
                    </TooltipContent>
                </Tooltip>
                
            </div>
            <Separator className="my-4 bg-gray-400 w-full" />
            <Examples word={word} toggle={toggle} />
        </div>
    );
}
"use client";

import type { item } from "@/app/dictionary/page";
import { AudioLinesIcon } from "lucide-react";

export default function AudioButton({ item }: { item: item }) {
    
    return (
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            const audio = document.getElementById(item.word) as HTMLAudioElement;
            audio.play();
        }}>
            <AudioLinesIcon className="w-10 h-10 text-indigo-800 hover:text-indigo-900" />
        </button>
    );
}
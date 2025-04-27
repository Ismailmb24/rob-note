"use client";

import type { item } from "./WordList";
import { AudioLinesIcon } from "lucide-react";

export default function AudioButton({ data }: { data: item }) {
    
    return (
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            const audio = document.getElementById(data.word) as HTMLAudioElement;
            if (!audio) return;
            audio.play();
        }}>
            <AudioLinesIcon className="w-10 h-10 text-indigo-800 hover:text-indigo-900" />
        </button>
    );
}
"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useState } from "react";

export default function SearchForm() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.replace(`/dictionary?search=${encodeURIComponent(query)}`);
    };

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit} className="w-11/12 mx-auto" noValidate autoComplete="off">
                <Input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                name="search" 
                type="text" 
                placeholder="search for word or phrase"
                className="w-full py-2 pl-10 border-2 border-gray-500 rounded-full focus:outline-none bg-[url('../public/search.png')] bg-no-repeat bg-[10px] bg-[length:20px_20px] placeholder:text-gray-500"
                />
            </form>
        </div>
    )
}
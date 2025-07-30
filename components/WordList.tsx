import WordCard from "@/components/WordCard";
import { MeaningProps } from "./Definition";
import { FileWarning, Search } from "lucide-react";

export interface item {
    word: string;
    meanings: MeaningProps[];
    audio: string;
}

export default async function WordSearchResult({ search }: { search: string }) {
  // This component is used to display the search results for a word search.
    const res = await fetch(`${process.env.ORIGIN_URL}/api?search=${search}`);
    const data = await res.json();

    if (res.status !== 200 ) {
        // If the response is not ok, it means there was an error
        // and we should display an error message.
        // The error message is returned in the response body.
        if (data.error === "No results found") {
            return (
                <div className="text-center mt-10 h-[60vh] flex flex-col justify-center items-center">
                    <FileWarning className="w-16 h-16 text-gray-500 mb-4" />
                    <p className="text-gray-500">{data.error}</p>
                </div>
            )
        }
        return (
            <div className="text-center mt-10 h-[60vh] flex flex-col justify-center items-center">
                <Search className="w-16 h-16 text-gray-500 mb-4" />
                <p className="text-gray-500">{data.error}</p>
            </div>
        )
    }
    
    return (
        <div className="mb-10">
            {
                data.map((item: item) => (
                    <WordCard key={item.word} item={item} />
                ))   
            }
        </div>
    );
}
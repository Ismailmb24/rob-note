import { NoteTypes } from "@/lib/services/note";
import {  Check, Copy, CornerDownRight, Languages, Repeat, Sparkles, Terminal } from "lucide-react";
import EnhancementSkeleton from "./EnhancementSkeleton";
import { marked } from "marked";
import { copyHtmlToClipboard } from "@/lib/util/copy";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import Pagination from "./pagination";
import ExpandableText from "./ExpandableText";

export default function Enhancement({
    notes,
    loading,
    error,
}: {
    notes: NoteTypes[],
    loading: boolean,
    error: boolean
}) {
    //this control note list for pagination navigation
    const {
        current,
        index,
        prev,
        next,
        hasNext,
        hasPrev
    } = usePagination<NoteTypes>(notes);
    const {enhancedText, originalText, turn, prompt, language} = current || {}; // this is current note

    //this is copied that help displayed copy to user when he click copy icon
    const [copied, setCopied] = useState<boolean>(false);

    //if loading return loading ui
    if (loading) return <EnhancementSkeleton />

    //ready to copy 
    //this make our ehanced text html string sweetable to use in different apps as formatted text
    const htmlString = marked?.parse((enhancedText as string) || "");

    if (error) return (
        <div className="text-center mt-10 flex flex-col justify-center items-center text-sm italic h-[80vh]">
            <h2>Something went bad !!!</h2>
            <p className="text-gray-500">try again</p>
        </div>
    );

    if (!notes?.length) return (
        <div className="text-center mt-10 flex flex-col justify-center items-center h-[80vh]">
            <Sparkles className="w-32 h-32 text-gray-500 mb-4" />
            <p className="text-gray-500">Enter your note to get started </p>
        </div>
    );

    return (
        <>
            {enhancedText && <div className="w-full p-5">
                <div className="w-4/5 flex gap-2 font-light text-sm text-gray-500 mb-10">
                    <div className="w-32">
                        <CornerDownRight size={16} />
                    </div>
                     
                    <div>
                        <ExpandableText text={originalText as string} maxLength={200} />
                        {
                            prompt ? (
                                <div className="flex gap-3 items-center">
                                    <Terminal size={16} />
                                    <p>
                                        {prompt.substring(0, 50)} 
                                        {prompt.length > 50 && "..."}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex gap-8">
                                    {
                                        language && 
                                        <div className="flex gap-3 items-center">
                                            <Languages size={16} />
                                            <p>{language}</p>
                                        </div>
                                    }
                                    {
                                        turn && 
                                        <div className="flex gap-3 items-center">
                                            <Repeat size={16} />
                                            <p>{turn}</p>
                                        </div>
                                    }
                                </div>
                            )
                        }            
                    </div>
                    
                </div>
                <div 
                className=" dark:text-slate-100 md:m-5"
                dangerouslySetInnerHTML={{__html: htmlString}} ></div>
                <div 
                className="m-5 my-10 flex gap-5 text-sm dark:text-slate-200 items-center">
                    <div 
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => {
                        copyHtmlToClipboard((htmlString as string), (enhancedText as string));
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                        }, 3000);
                    }}>
                        {
                            copied ? (
                                <>
                                    <Check size={20} className="font-semibold" />
                                    <p>copied</p>
                                </>
                            ) : (
                                <>
                                    <Copy size={20} className="font-semibold" />
                                    <p>copy</p>
                                </>
                            )
                        }
                    </div>
                    <Pagination 
                    currentIndex={index}
                    limit={notes?.length}
                    onPrev={prev}
                    onNext={next}
                    hasPrev={hasPrev}
                    hasNext={hasNext} />
                </div>
            </div>}
        </>
    )
}
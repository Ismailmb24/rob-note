import { correction } from "@/app/enhancer/page";
import {  CornerDownRight, Languages, Loader, Repeat } from "lucide-react";

export default function Enhancement({
    correction,
    loading,
    error,
}: {
    correction: correction | null;
    loading: boolean;
    error: boolean;
}) {

    if (loading) return (
        <div className="flex justify-center items-center h-50">
            <Loader className="animate-spin text-indigo-900" />
        </div>
    );

    if (error) return (
        <div className="text-center mt-10 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Something went bad</h1>
            <p className="text-gray-500">Please try again later.</p>
        </div>
    );

    return (
        <>
            <div className="w-full p-5">
                <div className="w-4/5 flex gap-2 font-light relative right-0 text-sm text-slate-400 mb-2">
                    <CornerDownRight /> 
                    <div>
                        <p className="italic">{correction?.correction.substring(0, 100)}...</p>
                        <div className="flex gap-5">
                            <div className="flex gap-1 items-center">
                                <Languages size={16} />
                                <p>English</p>
                            </div>
                            <div className="flex gap-1 items-center">
                                <Repeat size={16} />
                                <p>Formal</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <p className="w-full">{correction?.correction}</p>
            </div>
        </>
    )
}
import { correction } from "@/app/enhancer/page";
import { Loader } from "lucide-react";

export default function Enhancement({
    correction,
    outputWordsAmount,
    loading,
    error,
}: {
    correction: correction | null;
    outputWordsAmount: number | undefined;
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

    // if (!correction) return (
    //     <div className="text-center mt-10 flex flex-col justify-center items-center">
    //         <h1 className="text-2xl font-bold">This is where </h1>
    //         <p className="text-gray-500">Please try again later.</p>
    //     </div>
    // );
    
    return (
        <>
            <div className="h-52 lg:h-80 border-b border-gray-300">
                <p className="">{correction?.correction}</p>
            </div>
            <div>
                words: {outputWordsAmount}
            </div>
        </>
    )
}
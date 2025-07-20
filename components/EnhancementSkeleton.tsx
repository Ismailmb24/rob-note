import { NoteTypes } from "@/lib/services/note";
import {  CornerDownRight, Languages, Loader, Repeat, Terminal } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface EnhancementProps extends Omit<NoteTypes, never> {
    loading: boolean;
    error: boolean;
}

export default function EnhancementSkeleton() {
    return (
        <>
            <div className="w-full p-5">
                <div className="w-4/5 my-5">
                    <Skeleton className="w-full h-20 rounded-2xl" />
                </div>
                <div className="w-full my-5">
                    <Skeleton className="w-full h-36" />
                </div>
                <div className="w-full my-5">
                    <Skeleton className="w-1/3 h-10" />
                </div>
            </div>
        </>
    )
}
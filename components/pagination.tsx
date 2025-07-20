import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Pagination({
    currentIndex,
    limit,
    onPrev = () => {},
    onNext = () => {},
    hasPrev,
    hasNext
}: {
    currentIndex: number,
    limit: number,
    onPrev: () => void,
    onNext: () => void,
    hasPrev: boolean,
    hasNext: boolean
}) {
    
    return (
        <div className="flex justify-between gap-3 items-center">
            <Button 
            className="bg-transparent hover:bg-transparent cursor-pointer" 
            onClick={onPrev} 
            disabled={!hasPrev}><ChevronLeft className="text-slate-900" /></Button>
            <div>{currentIndex + 1} / {limit}</div>
            <Button 
            className="bg-transparent hover:bg-transparent cursor-pointer" 
            onClick={onNext} 
            disabled={!hasNext}><ChevronRight className="text-slate-900" /></Button>
        </div>
    )
}
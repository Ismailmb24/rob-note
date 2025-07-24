import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-5">
            <SearchX className="w-20 h-20 text-gray-500" />
            <p className="text-slate-900">404 - page not found</p>
            <p className="text-slate-900">No results found</p>
        </div>
    );
}
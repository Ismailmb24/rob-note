import { Skeleton } from "./ui/skeleton";

export default function EnhancementSkeleton() {
    return (
        <>
            <div className="w-full p-5">
                <div className="w-4/5 my-5">
                    <Skeleton className="w-full h-20 rounded-2xl bg-gray-300" />
                </div>
                <div className="w-full my-5">
                    <Skeleton className="w-full h-36 bg-gray-300" />
                </div>
                <div className="w-full my-5">
                    <Skeleton className="w-1/3 h-10 bg-gray-300" />
                </div>
            </div>
        </>
    )
}
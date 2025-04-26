import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function WordCardSkeleton() {
    
    return (
        <Card className="p-2 py-3 mt-10 mx-5">
                <CardHeader className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-6 flex-grow" />
                </CardHeader>
                <CardContent className="text-gray-500">
                    <Skeleton className="h-4 mt-2 w-full" />
                    <Skeleton className="h-4 mt-2 w-full" />
                    <Skeleton className="h-4 mt-2 w-1/2" />
                </CardContent>
            </Card>

    )
}
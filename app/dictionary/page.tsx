import SearchForm from "@/components/SearchForm";
import WordList from "@/components/WordList";
import WordListSkeleton from "@/components/WordListSkeleton";
import { Suspense } from "react";

export default async function Page(
    { searchParams }: { searchParams : Promise<{search: string}> }
) {
    const { search } = await searchParams;
    
    return (
        <main className="max-w-6xl mx-auto">
            <SearchForm />
            <Suspense fallback={ <WordListSkeleton /> }>
                <WordList search={search} />
            </Suspense>
        </main>
    );
}
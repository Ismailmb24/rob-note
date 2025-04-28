import WordCardSkeleton from "./WordCardSkeleton";

export default function WordListSkeleton({ search }: { search: string }) {

    return (
        <div className="mb-10">
            <h1 className="text-2xl font-bold mt-10 mx-5">
                Results for &quot;{
                    search?.length < 20 ?
                    search :
                    search.slice(0, 20) + "..."
                }&quot;
            </h1>
            {
                [...Array(10)].map((arr: undefined, i: number) => (
                    <WordCardSkeleton key={i}  />
                ))
            }
        </div>
    )
}
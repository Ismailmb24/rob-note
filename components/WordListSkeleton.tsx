import WordCardSkeleton from "./WordCardSkeleton";

export default function WordListSkeleton() {

    return (
        <div className="mb-10">
            <h1 className="text-2xl font-bold mt-10 mx-5">
                Results for &quot; ... &quot;
            </h1>
            {
                [...Array(10)].map((arr: undefined, i: number) => (
                    <WordCardSkeleton key={i}  />
                ))
            }
        </div>
    )
}
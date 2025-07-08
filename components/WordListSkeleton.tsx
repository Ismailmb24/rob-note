import WordCardSkeleton from "./WordCardSkeleton";

export default function WordListSkeleton() {

    return (
        <div className="mb-10">
            {
                [...Array(10)].map((arr: undefined, i: number) => (
                    <WordCardSkeleton key={i}  />
                ))
            }
        </div>
    )
}
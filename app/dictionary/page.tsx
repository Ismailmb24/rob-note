import SearchForm from "@/components/SearchForm";
import WordCard from "@/components/WordCard";

export interface item {
    word: string;
    meanings: any[];
    audio: string;
}

export default async function Page(
    { searchParams }: { searchParams : Promise<{search: string}> }
) {
    const { search } = await searchParams;
    const res = await fetch(`http://localhost:3000/api?search=${search}`);
    const data = await res.json();
    console.log("data", data);

    return (
        <main className="lg:max-w-6xl mx-auto">
            <SearchForm />
            {
                res.status !== 200 
                ? (
                    <div className="text-center mt-10">
                        <h1 className="text-2xl font-bold">{data.error}</h1>
                        <p className="text-gray-500">Try searching for something else.</p>
                    </div>
                )
                : (
                    <div>
                        <h1 className="text-2xl font-bold mt-10 mx-10">
                            Results for "{
                                search.length < 20 ?
                                search :
                                search.slice(0, 20) + "..."
                            }"
                        </h1>
                        {
                            data.map((item: item) => (
                                <WordCard key={item.word} item={item} />
                            ))   
                        }
                    </div>
                )
            }
        </main>
    );
}
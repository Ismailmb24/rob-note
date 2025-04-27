import WordCard from "@/components/WordCard";

export interface item {
    word: string;
    meanings: any[];
    audio: string;
}

export default async function WordSearchResult({ search }: { search: string }) {
  // This component is used to display the search results for a word search.
    const res = await fetch(`${process.env.MY_API_URL}?search=${search}`);
    const data = await res.json();
    
    return (
        <div>
            {
                res.status !== 200 
                ? (
                    <div className="text-center mt-10 h-[60vh] flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold">{data.error}</h1>
                        <p className="text-gray-500">Try searching for something else.</p>
                    </div>
                )
                : (
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold mt-10 mx-5">
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
        </div>

    );
}
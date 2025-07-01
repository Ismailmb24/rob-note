import AiExample from "@/components/AiExample";
import Definition, { MeaningProps } from "@/components/Definition";
import WordHead from "@/components/WordHead";
import { requireAuth } from "@/lib/require-auth";

export default async function Page({ params }: { params: Promise<{ word: string }> }) {
    // This page requires log in
    // If user is not loged in he will be redirected to sing in page 
    await requireAuth();
    const { word } = await params;
    // Fetch the word data from the API
    const res = await fetch(`${process.env.MY_API_URL}/${word}`);
    const data = await res.json();

    return (
        <main className="px-5 xl:p-0 max-w-6xl mx-auto">
            {
                res.status !== 200
                    ? (
                        <div className="text-center mt-10 h-[60vh] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold">{data.error}</h1>
                        </div>
                    )
                    : (
                        <div className="mt-10">
                            <div className="flex itmes-center">
                                <WordHead data={data} />
                            </div>
                            <div className="my-10">
                                <div >
                                    {
                                        data.meanings.map((meaning: MeaningProps) => (
                                            <Definition
                                            key={meaning.partOfSpeech}
                                            meaning={meaning} />
                                        ))
                                    }
                                </div>   
                            </div>
                            <AiExample word={word} />
                        </div> 
                    )
            }
        </main> 
    );
}
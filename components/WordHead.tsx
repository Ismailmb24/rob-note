import Link from "next/link";
import AudioButton from "./AudioButton";
import { MeaningProps } from "./Definition";
import { Badge } from "./ui/badge";
import { item } from "./WordList";

// part of speect color label
const posColors = {
  noun: "bg-blue-100 text-blue-800",
  verb: "bg-red-100 text-red-800",
  adjective: "bg-green-100 text-green-800",
  adverb: "bg-yellow-100 text-yellow-800",
  pronoun: "bg-indigo-100 text-indigo-800",
  preposition: "bg-purple-100 text-purple-800",
  conjunction: "bg-pink-100 text-pink-800",
  interjection: "bg-orange-100 text-orange-800",
  determiner: "bg-teal-100 text-teal-800",
  article: "bg-cyan-100 text-cyan-800",
  auxiliary: "bg-gray-100 text-gray-800",
};

export default function WordHead({ data }: {data: item}) {
    
    return (
        <>
            {
                data.audio && <audio 
                src={ data.audio} 
                className="invisble" 
                id={data.word} />
            }
            <AudioButton data={data} />
            <div className="ml-4">
                <h1 className="text-2xl my-2">
                    <Link href={`/dictionary/${data.word}`} className="no-underline ">
                        {data.word}
                    </Link>
                </h1>
                {
                    data.meanings.map((meaning : MeaningProps, index: number) => (
                        <Badge 
                        key={index} 
                        className={`${posColors[meaning.partOfSpeech as keyof typeof posColors] ?? ""} mr-2`}>
                            <Link href={`#${meaning.partOfSpeech}`}>
                                {meaning.partOfSpeech}
                            </Link>
                        </Badge>
                    ))
                }
                <Badge variant="outline" className="rounded-full px-2 text-green-600">
                    x{data.meanings.length} meanings
                </Badge>
            </div>
        </>
    )
}
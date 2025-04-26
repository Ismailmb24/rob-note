import { item } from "@/app/dictionary/page";
import AudioButton from "./AudioButton";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function WordCard({ item }: { item: item}) {
    
    return (
        <Link href={`/${item.word}`} className="no-underline "> 
            <Card key={item.word} className="p-2 py-3 mt-10 mx-5">
                <CardHeader >
                    <div className="flex">
                        {
                            item.audio && <audio 
                            src={ item.audio} 
                            className="invisble" 
                            id={item.word} />
                        }
                        <AudioButton item={item} />
                        <h1 className="text-2xl FONT-THIN ml-4">{item.word}</h1>
                    </div>
                    <div>
                        {
                            item.meanings.map((meaning : any, index: number) => (
                                <span 
                                key={index} 
                                className="text-gray-500 text-sm font-semibold mr-2">
                                    {meaning.partOfSpeech} |
                                </span>
                            ))
                        }
                    </div>
                    
                </CardHeader>
                <CardContent className="text-gray-500">
                    <p 
                    className="text-lg">
                        {item.meanings[0].definitions[0].definition}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
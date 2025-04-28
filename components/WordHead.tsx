import AudioButton from "./AudioButton";
import { MeaningProps } from "./Definition";
import { item } from "./WordList";

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
                <h1 className="text-2xl">{data.word}</h1>
                {
                    data.meanings.map((meaning : MeaningProps, index: number) => (
                        <span 
                        key={index} 
                        className="text-gray-500 text-sm font-semibold mr-2">
                            {meaning.partOfSpeech} |
                        </span>
                    ))
                }
            </div>
        </>
    )
}
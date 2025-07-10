import { NotepadText,} from "lucide-react";

export interface MeaningProps {
    partOfSpeech: string;
    definitions: {
        definition: string;
        example?: string;
    }[];
}

export default function Definition({ meaning }: { meaning: MeaningProps}) {
    
    return (
        <div className="flex flex-col gap-2 mt-10" id={meaning?.partOfSpeech}>
            <h2 className="font-thin text-gray-400">[{meaning?.partOfSpeech}]</h2>
            <div className="text-slate-800">
                {meaning?.definitions.map((
                    definition: MeaningProps["definitions"][0],
                    index: number
                ) => (
                    <div key={index} className="flex flex-col gap-2 mt-2 my-8">
                            <p className="text-slate-800">
                                <NotepadText size={14} className="inline-block mr-2" /> 
                                {definition.definition}
                            </p>
                            <ul className="list-disc list-inside">
                                {
                                    definition.example && (
                                        <li className="text-gray-500 italic">{definition.example}</li>
                                    )
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
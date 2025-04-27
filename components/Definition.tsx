export interface DefinitionProps {
    partOfSpeech: string;
    definitions: object[];
}

export default function Definition({ definition }: { definition: DefinitionProps}) {
    
    return (
        <div className="flex flex-col gap-2 mt-10">
            <h2 className="font-thin text-gray-300">[{definition.partOfSpeech}]</h2>
            <div className="text-slate-800">
                {
                    definition.definitions.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col gap-2 mt-2">
                            <p className="text-slate-800">- {item.definition}</p>
                            <ul className="list-disc list-inside">
                                {
                                    item.example && (
                                        <li className="text-gray-500 italic">"{item.example}"</li>
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
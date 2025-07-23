import { MeaningProps } from "@/components/Definition";

export const getWordMeaning = async (wordTerm: string) => {
    //fetch word meaning from the API
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordTerm}`);
    const data = await res.json();
    
    //if the word is not found return null
    if (res.status === 404) {
        return null;
    }
    
    //if the word is found return the meaning
    const {word, phonetic, phonetics: [{ audio }], meanings} = data[0];
    return {
        word,
        phonetic,
        audio,
        meanings: meanings.map((item: {partOfSpeech: string, definitions: MeaningProps["definitions"]}) => ({
                partOfSpeech: item.partOfSpeech,
                definitions: item.definitions.map((definition) => ({
                        definition: definition.definition,
                        example: definition.example,
                })),
        })),
    }
}


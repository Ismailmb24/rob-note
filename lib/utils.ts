//our model API key
const apiKey = process.env.MODEL_API_KEY;

export const getWordMeaning = async (wordTerm: string) => {
    //fetch word meaning from the API
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordTerm}`);
    const data = await res.json();
    console.log("data !!!", res);
    
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
        meanings: meanings.map((item: {partOfSpeech: string, definitions: any[]}) => ({
                partOfSpeech: item.partOfSpeech,
                definitions: item.definitions.map((definition) => ({
                        definition: definition.definition,
                        example: definition.example,
                })),
        })),
    }
}

// Function to parse the AI response
// This function extracts the JSON part from the AI response string
export const parseAiResponse = (response: any) => {
    //Parse the response string to JSON
    const jsonText = response?.match(/```json([\s\S]*?)```/)[1].trim();
    const json = JSON.parse(jsonText);

    return json;
}

// Function to get word examples from the AI
export const getAiWordExamples = async (word: string) => {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Respond in the following JSON format:
                        {
                        "examples": [
                            "example 1",
                            "example 2",
                            "example 3"
                        ]
                        }
                        Now: give me 3 example of sentence with word ${word} only` }],
                }],
            }),
        }
    );
    const data = await res.json();

    if (res.status !== 200) {
        return null;
    }
    
    const examples = data?.candidates[0]?.content.parts[0]?.text;
    console.log("examples !!!", examples);
    const parsedExamples = parseAiResponse(examples);
    return parsedExamples;
}

// Function to get AI correction for a given text
// This function sends a request to the AI model to correct the grammar and spelling of the provided text
// and returns the corrected text in JSON format.
export const getAiCorrection = async (text: string) => {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Respond in the following JSON format:
                        {
                        "Correction": "corrected text",
                        }
                        Now: Correct the following text in a right grammar and spelling:${text}` }],
                }],
            }),
        }
    );
    const data = await res.json();
    console.log("data !!!", data);

    if (res.status !== 200) {
        return null;
    }
    
    const correction = data?.candidates[0]?.content.parts[0]?.text;
    const parsedCorrection = parseAiResponse(correction);
    return parsedCorrection;
}
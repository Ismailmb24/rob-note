import { NoteTypes } from "./note";
//our model API key
const apiKey = process.env.MODEL_API_KEY;

// Function to parse the AI response
// This function extracts the JSON part from the AI response string
export const parseAiResponse = (response: string) => {
    //Parse the response string to JSON
    const match = response.match(/```json([\s\S]*?)```/);
    if (!match || !match[1]) {
        return null;
    }
    const jsonText = match[1].trim();
    const parsedJson = JSON.parse(jsonText);

    return parsedJson;
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
                        Now: give me 5 example of sentence with word ${word} only` }],
                }],
            }),
        }
    );
    const data = await res.json();

    if (res.status !== 200) {
        return null;
    }
    
    const examples = data?.candidates[0]?.content.parts[0]?.text;
    const parsedExamples = parseAiResponse(examples);
    if (!parsedExamples || !parsedExamples.examples) {
        return null;
    }
    return parsedExamples;
}

// Function to get AI correction for a given text
// This function sends a request to the AI model to correct the grammar and spelling of the provided text
// and returns the corrected text in JSON format.
export const getAiCorrection = async ({
    originalText,
    language, 
    turn,
    prompt
}: NoteTypes) => {
    // Ai query
    const contents = !prompt 
    ? ([{
        parts: [{
            text: `You are a helpful assistant. Please correct the following text for grammar and spelling in ${language} language, using the ${turn} turn. Respond only with a JSON object in this format:
                {
                "correction": "corrected text in clear and clean markdown format"
                }
                Text to correct: ${originalText}`
        }],
    }])
    : ([{
        parts: [{
            text: `You are a helpful assistant. Please correct the following text for grammar and spelling using this prompt ${prompt}. Respond only with a JSON object in this format:
                {
                "correction": "corrected text in clear and clean markdown format"
                }
                Text to correct: ${originalText}`
        }],
    }]);
    console.log("Custommm!!: ", prompt)

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents
            }),
        }
    );
    const data = await res.json();
    console.log("real Data!!", data?.candidates);   

    if (res.status !== 200) {
        return null;
    }
    
    const correction = data?.candidates[0]?.content.parts[0]?.text;
    const parsedCorrection = parseAiResponse(correction);
    return parsedCorrection;
}
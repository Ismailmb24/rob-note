import { getAiWordExamples } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.nextUrl);
    const word = searchParams.get("word");

    //if there is no word in the search params return error
    if (!word) {
        return NextResponse.json({
            error: "Please provide a word.",
        }, { status: 400 });
    }

    //get the word examples from the ai
    const aiExamples = await getAiWordExamples(word);

    //if the word examples are not found return error
    if (!aiExamples) {
        return NextResponse.json({
            error: "Something went wrong.",
        }, { status: 500 });
    }

    return NextResponse.json(aiExamples);
}
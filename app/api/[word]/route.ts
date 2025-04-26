import { getWordMeaning } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{
    word: string,
}>}) {
    const { word } = await params;

    const wordMeaning = await getWordMeaning(word);
    if (!wordMeaning) {
        return NextResponse.json({
            error: "No results found.",
        }, { status: 404 });
    }

    return NextResponse.json(wordMeaning);
}
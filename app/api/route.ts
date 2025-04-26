import { getWordMeaning } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.nextUrl);
    const search = searchParams.get("search");

    //if there is no search term return error
    if (!search || search === "undefined") {
        return NextResponse.json({
            error: "Please provide a search term.",
        }, { status: 400 });
    }
    
    //split searched words into array list
    const searchTerms = search.toLowerCase().split(" ");

    //if there is only one word send it's meaning to client
    if (searchTerms.length === 1) {
        const wordMeaning = await getWordMeaning(searchTerms[0]);
        if (!wordMeaning) {
            return NextResponse.json({
                error: "No results found.",
            }, { status: 404 });
        }
        
        return NextResponse.json([wordMeaning]);
    }

    // //fileter words that are not two letter words
    // const filteredSearchTerms = searchTerms.filter((term) => term.length > 2);
    // if (filteredSearchTerms.length === 0) {
    //     return NextResponse.json({
    //         error: "No results found.",
    //     }, { status: 404 });
    // }

    //fetch meaning of each words in the list and return them
    const searchResults = await Promise.all(
        searchTerms.map(async (term) => getWordMeaning(term))
    );

    //filtered words that are succefully fetched
    const filteredResults = searchResults.filter((result) => result !== null);
    if (filteredResults.length === 0) {
        return NextResponse.json({
            error: "No results found.",
        }, { status: 404 });
    }

    //send the filterd words meaning to client
    return NextResponse.json(filteredResults);
}
import { auth } from "@/auth";
import { getAiCorrection } from "@/lib/services/getFromAi";
import { createNote, NoteTypes } from "@/lib/services/note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    //check if user is authenticated
    const session = await auth();

    //if there is no authenticated user return error message: user not authenticated
    if (!session?.user) {
        return NextResponse.json({
            error: "User not authenticated.",
        }, { status: 401 });
    }

    //get the client requested note from the request body
    const body = await request.json();
    const {
        originalText,
        language,
        turn,
        prompt,
        sessionId
    } = body;

    // this are the all inputed data
    const inputedData: NoteTypes = {
        sessionId,
        originalText,
        language,
        turn,
        prompt
    }

    //if there is no note in the request body return error
    if (!originalText) {
        return NextResponse.json({
            error: "Please provide a note.",
        }, { status: 400 });
    }

    //get the correction from the ai
    const correction = await getAiCorrection(inputedData);
    const enhancedText = correction?.correction;

    //if there is not correction responce return error
    if (!enhancedText) {
        return NextResponse.json({
            error: "Something went wrong.",
        }, { status: 500 });
    }

    //if there is correction save it to data base
    const note = await createNote({...inputedData, enhancedText})
    return NextResponse.json(note);
}
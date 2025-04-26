import { getAiCorrection } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    //get the client requested note from the request body
    const { note } = await request.json();

    //if there is no note in the request body return error
    if (!note) {
        return NextResponse.json({
            error: "Please provide a note.",
        }, { status: 400 });
    }

    //get the correction from the ai
    const correction = await getAiCorrection(note);
    if (!correction) {
        return NextResponse.json({
            error: "Something went wrong.",
        }, { status: 500 });
    }

    //Send the correction to the client
    return NextResponse.json(correction);
}
import { getAiCorrection } from "@/lib/getFromAi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    //get the client requested note from the request body
    const formData = request.formData();
    const note = (await formData).get("note") as string;
    const language = (await formData).get("language") as string;
    const turn = (await formData).get("turn") as string;

    // this are the all inputed data
    const inputedData = {
        note,
        language,
        turn
    }

    //if there is no note in the request body return error
    if (!note) {
        return NextResponse.json({
            error: "Please provide a note.",
        }, { status: 400 });
    }

    //get the correction from the ai
    const correction = await getAiCorrection(inputedData);
    if (!correction) {
        return NextResponse.json({
            error: "Something went wrong.",
        }, { status: 500 });
    }

    //Send the correction to the client
    return NextResponse.json(correction);
}
import { auth } from "@/auth";
import { getAiCorrection } from "@/lib/services/getFromAi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    //check if user is authenticated
    const session = await auth();

    //if there is no authenticated user return user not authenticated
    if (!session?.user) {
        return NextResponse.json({
            error: "User not authenticated.",
        }, { status: 401 });
    }

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

    //if there is not correction responce return error
    if (!correction) {
        return NextResponse.json({
            error: "Something went wrong.",
        }, { status: 500 });
    }

    //if there is correction save it to data base
    
}
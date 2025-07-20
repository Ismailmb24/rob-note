"use server";
import { prisma } from "../prisma";
import { auth } from "@/auth";
import { requireAuth } from "../require-auth";

export type NoteTypes = {
    id?: string,
    sessionId?: string,
    language: string, 
    turn: string,
    originalText: string,
    enhancedText?: string,
    prompt?: string,
}

export async function createNote({
    sessionId,
    language,
    turn,
    prompt,
    originalText,
    enhancedText,
}: NoteTypes) {
    //get session
    const session = await auth();
    //if ther is no user session id throw error
    if (!session?.user?.id) {
        throw new Error("user not authenticated")
    }

    //if ther is no note session id throw error
    if (!sessionId) {
        const newSession = await prisma.noteSession.create({
            data: {
                userId: session?.user?.id,
                title: enhancedText?.substring(0, 20) as string,
            }
        });
        sessionId = newSession.id; 
    }

    const note = await prisma.note.create({
        data: {
            sessionId,
            language,
            turn,
            prompt: prompt ?? "",
            originalText,
            enhancedText: enhancedText ?? "",
        }
    })

    return note;
}

export async function deleteNote(sessionId: string) {
    //this function deletes a note by its ID
    //this requires user authentication
    requireAuth();
    
    const note = await prisma.noteSession.delete({
        where: {
            id: sessionId,
        }
    });

    return note;
}
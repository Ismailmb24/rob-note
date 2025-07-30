// filepath: /pages/api/noteSession/[id].ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{id: string}>}
) {
    //get the id from the params
    const { id } = await params;

    //if the id is not found return error
    if (!id) {
        return NextResponse.json({ error: 'Invalid id' });
    }

    //get the note session from the database
    const noteSession = await prisma.noteSession.findUnique({
        where: { id },
        include: {
            notes: {
                orderBy: {
                    createdAt: 'asc', // or 'desc' for descending order
                },
            },
        },
    });
     
    return NextResponse.json(noteSession);
}
// filepath: /pages/api/noteSession/[id].ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{id: string}>}
) {
    const { id } = await params;
    console.log("Params", id)
    if (!id) {
        return NextResponse.json({ error: 'Invalid id' });
    }
    const noteSession = await prisma.noteSession.findUnique({
        where: {id},
        include: {notes: true},
    });
     
    return NextResponse.json(noteSession);
}
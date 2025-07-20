// filepath: /pages/api/noteSession/[id].ts
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET( req: NextRequest ) {
    const session = await auth();
    const userId = session?.user?.id;
    const noteSession = await prisma.noteSession.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
     
    return NextResponse.json(noteSession);
}
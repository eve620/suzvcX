import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    const data = await prisma.note.findMany({
        where: {
            type: "Note",
            createdById: 123
        }
    })
    return NextResponse.json({data}, {status: 200})
}
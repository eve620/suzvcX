import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = Number(searchParams.get("id"))
    if (!id) return NextResponse.json({message: "无用户"}, {status: 200});
    const data = await prisma.note.findMany({
        where: {
            createdById: id
        }
    })
    return NextResponse.json({data}, {status: 200})
}
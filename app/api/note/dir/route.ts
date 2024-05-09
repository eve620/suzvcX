import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    return NextResponse.json({message: "hhhhh"})
}

export async function POST(request: NextRequest) {
    const dirName = await request.json()
    prisma.note.create({
        data: {
            name: dirName.name,
            type: "Dir",
            createdBy:"123"
        }
    })
    return NextResponse.json({message: "hhhhh"})
}

export async function DELETE(request: NextRequest) {
    return NextResponse.json({message: "hhhhh"})
}

export async function PUT(request: NextRequest) {
    return NextResponse.json({message: "hhhhh"})
}
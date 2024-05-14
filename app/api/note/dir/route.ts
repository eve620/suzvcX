import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.note.findMany({
            where: {
                type: "Dir",
                createdBy: "123"
            }
        })
        return NextResponse.json({data}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "获取失败"}, {status: 500})
    }
}

export async function POST(request: NextRequest) {
    try {
        const dirName = await request.json()
        const note = await prisma.note.create({
            data: {
                name: dirName,
                type: "Dir",
                createdBy: "123"
            }
        })
        return NextResponse.json({message: "添加成功"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: '添加失败'}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteDir = await prisma.note.delete({
            where: {
                id: Number(id)
            }
        })
        if (deleteDir) {
            // 删除文件夹下的所有文件
            const deleteNote = await prisma.note.deleteMany({
                where: {
                    parent: deleteDir.id
                }
            })
        }
        return NextResponse.json({message: "删除成功"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "删除失败"}, {status: 500})
    }
}

export async function PUT(request: NextRequest) {
    return NextResponse.json({message: "hhhhh"})
}
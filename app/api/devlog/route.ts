import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.devLog.findMany()
        return NextResponse.json({data}, {status: 200});
    } catch (error) {
        // 如果发生错误，返回404
        return NextResponse.json({message: '查询失败'}, {status: 500});
    }
}

export async function POST(request: NextRequest) {
    try {
        const {time, content} = await request.json()
        const devLog = await prisma.devLog.create({
            data: {
                time,
                content
            }
        })
        return NextResponse.json({message: "添加成功"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: '添加失败'}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {

}
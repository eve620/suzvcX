import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.project.findMany()
        return NextResponse.json({data}, {status: 200});
    } catch (error) {
        // 如果发生错误，返回404
        return NextResponse.json({message: '查询失败'}, {status: 500});
    }
}

export async function POST(request: NextRequest) {

}
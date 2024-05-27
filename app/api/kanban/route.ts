import {NextRequest, NextResponse} from "next/server";

import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    let id = Number(searchParams.get('id'))
    if (!id) return NextResponse.json({message: "无用户"}, {status: 200});
    try {
        let data = await prisma.event.findMany({
            where: {
                createdById: id,
            }
        })
        return NextResponse.json({data}, {status: 200});
    } catch (error) {
        // 如果发生错误，返回404
        return NextResponse.json({message: '查询失败'}, {status: 500});
    }
}

export async function POST(request: NextRequest) {

}
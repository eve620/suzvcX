import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import * as fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.project.findMany({
            where: {
                createdById: 1,
            }
        }
        )
        return NextResponse.json({data}, {status: 200});
    } catch (error) {
        // 如果发生错误，返回404
        return NextResponse.json({message: '查询失败'}, {status: 500});
    }
}

import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {hash} from "bcrypt"

export async function POST(request: NextRequest) {
    try {
        const {account, password} = await request.json()
        // 判断是否存在
        const user = await prisma.user.findUnique({
            where: {
                account
            }
        })
        if (user) return NextResponse.json({error: "用户名已存在"}, {status: 400})
        // 创建新用户
        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                account,
                password: hashedPassword
            }
        })
        return NextResponse.json(newUser)
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}
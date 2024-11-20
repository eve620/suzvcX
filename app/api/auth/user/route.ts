import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {compare, hash} from "bcrypt"

export async function POST(request: NextRequest) {
    try {
        const {username, account, password} = await request.json()
        // 判断是否存在
        const user = await prisma.user.findUnique({
            where: {
                account
            }
        })
        if (user) return NextResponse.json({error: "该账号已存在"}, {status: 400})
        // 创建新用户
        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                account,
                password: hashedPassword
            }
        })
        return NextResponse.json(newUser)
    } catch (e) {
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    try {
        const {username, account, oldPassword, newPassword, bio} = await request.json()
        // 判断是否存在
        const user = await prisma.user.findUnique({
            where: {
                account
            }
        })
        if (!user) return NextResponse.json({error: "账号不存在"}, {status: 400})
        if (oldPassword) {
            const passwordCorrect = await compare(oldPassword, user.password);
            if (!passwordCorrect) return NextResponse.json({error: "原密码不正确"}, {status: 400})
        }
        const hashedNewPassword = await hash(newPassword, 10);
        await prisma.user.update({
            where: {
                account
            },
            data: {
                username,
                bio,
                password: newPassword ? hashedNewPassword : user.password
            }
        })
        return NextResponse.json({message: "修改成功"})
    } catch (e) {
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {compare, hash} from "bcrypt"
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(__dirname, "../../../../..", "/public/storage/avatar");

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
        const {username, account, oldPassword, newPassword, bio, base64Image} = await request.json()
        let fileName = null
        // 判断是否存在
        const user = await prisma.user.findUnique({
            where: {
                account
            }
        })
        if (!user) return NextResponse.json({error: "账号不存在"}, {status: 400})
        if (base64Image) {
            if (user.image) {
                const deleteFilePath = path.join(process.cwd(), 'public', 'storage', 'avatar', user.image);
                fs.unlink(deleteFilePath, (err) => {
                    if (err) {
                        return NextResponse.json({error: '删除文件时出错', details: err.message}, {status: 500});
                    }
                    return NextResponse.json({message: '文件删除成功'}, {status: 200});
                });
            }
            const matches = base64Image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]*);base64,/);
            if (!matches) {
                return NextResponse.json({error: '无效的 Base64 图片'}, {status: 400});
            }
            const mimeType = matches[1];
            const extension = mimeType.split('/')[1];
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            fileName = `${Date.now()}.${extension}`;
            const filePath = path.join(process.cwd(), 'public', 'storage', 'avatar', fileName);
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    return NextResponse.json({error: '头像存储错误'}, {status: 500});
                }
            });
        }
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
                image: fileName,
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
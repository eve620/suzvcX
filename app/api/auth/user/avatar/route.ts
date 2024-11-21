import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {compare, hash} from "bcrypt"
import fs from "fs";
import path from "path";
import getCurrentUser from "@/app/actions/getCurrentUser";

const AVATAR_DIR = path.join(process.cwd(), 'public', 'storage', 'avatar');

export async function PUT(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) return NextResponse.json({error: "未登录"}, {status: 400})
        const {base64Image} = await request.json()
        let fileName = null
        if (base64Image) {
            if (currentUser.image) {
                const deleteFilePath = path.join(AVATAR_DIR, currentUser.image);
                fs.unlink(deleteFilePath, (err) => {
                    if (err) {
                        return NextResponse.json({error: '删除文件时出错', details: err.message}, {status: 500});
                    }
                    return NextResponse.json({message: '文件删除成功'}, {status: 200});
                });
            }
            const matches = base64Image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]*);base64,/);
            if (!matches) {
                return NextResponse.json({error: '无效的图片'}, {status: 400});
            }
            const mimeType = matches[1];
            const extension = mimeType.split('/')[1];
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            fileName = `${Date.now()}.${extension}`;
            const filePath = path.join(AVATAR_DIR, fileName);
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    return NextResponse.json({error: '头像存储错误'}, {status: 500});
                }
            });
            await prisma.user.update({
                where: {account: currentUser.account},
                data: {image: fileName}
            })
            return NextResponse.json({message: "修改成功"})
        }
        return NextResponse.json({error: "无效头像"}, {status: 400})
    } catch (e) {
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}
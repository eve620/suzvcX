import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import * as fs from "fs";
import path from "path";

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
    try {
        const formData = await request.formData()
        const title = formData.get("title") as string;
        const job = formData.get("job") as string;
        const stacks = formData.get("stack") as string;
        const startTime = formData.get("startTime") as string;
        const endTime = formData.get("endTime") as string;
        const describe = formData.get("describe") as string;
        const highlight = formData.get("highlight") as string;
        const createdBy = formData.get("createdBy") as string;
        const files: File[] = [];
        for (const [name, value] of formData.entries()) {
            if (name.startsWith("image") && value instanceof File) {
                files.push(value);
            }
        }
        const imageUrl: string[] = []
        const uploadDir = path.join(__dirname, "../../../../..", "/public/storage/project");
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = `${Date.now()}${file.name}`;
            const filePath = path.join(uploadDir, fileName);
            // 将ArrayBuffer转换为Buffer
            const buffer = Buffer.from(await file.arrayBuffer());

            // 将Buffer写入本地存储
            await new Promise<void>((resolve, reject) => {
                fs.writeFile(filePath, buffer, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        // 存储文件的地址到数组中
                        imageUrl.push(fileName);
                        resolve();
                    }
                });
            });
        }
        const project = await prisma.project.create({
            data: {
                title,
                job,
                stacks,
                startTime,
                endTime,
                describe,
                highlight,
                createdBy,
                imageUrl: JSON.stringify(imageUrl)
            }
        });
        return NextResponse.json({message: "添加成功"}, {status: 200});
    } catch (error) {
        // 如果发生错误，返回404
        return NextResponse.json({message: '添加失败'}, {status: 500});
    }
}
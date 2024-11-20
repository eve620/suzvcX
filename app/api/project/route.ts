import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import * as fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(__dirname, "../../../../..", "/public/storage/project");

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = Number(searchParams.get("id"))
    if (!id) return NextResponse.json({error: '未登录'}, {status: 401});
    try {
        const data = await prisma.project.findMany({
            where: {
                createdById: id,
            }
        })
        return NextResponse.json({data});
    } catch (error) {
        // 如果发生错误，返回404
        throw new Error('服务器出错')
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const {
            title,
            job,
            stacks,
            startTime,
            endTime,
            describe,
            highlight,
            createdById,
            files
        } = extractFormData(formData);
        const imageUrl = await saveFiles(files);

        await prisma.project.create({
            data: {
                title,
                job,
                stacks,
                startTime,
                endTime,
                describe,
                highlight,
                createdById,
                imageUrl: JSON.stringify(imageUrl)
            }
        });

        return NextResponse.json({message: "添加成功"});
    } catch (error) {
        throw new Error("服务器出错")
    }
}

export async function PUT(request: NextRequest) {
    try {
        const formData = await request.formData()
        const {
            title,
            job,
            stacks,
            startTime,
            endTime,
            describe,
            highlight,
            createdById,
            files,
        } = extractFormData(formData);
        const id = Number(formData.get("id"))
        const uploadedImage = JSON.parse(formData.get("uploadedImage") as string);
        if (id == undefined) {
            return NextResponse.json({message: "缺少项目ID"}, {status: 400});
        }
        const imageUrl = await saveFiles(files);
        const newImageUrl = [...uploadedImage, ...imageUrl];

        const project = await prisma.project.findUnique({
            where: {
                id
            },
        });
        if (!project) {
            return NextResponse.json({message: "项目未找到"}, {status: 404});
        }

        const existingImageUrl = JSON.parse(project.imageUrl)
        const filesToDelete = existingImageUrl.filter(item => !newImageUrl.includes(item));
        await deleteFiles(filesToDelete);
        await prisma.project.update({
            where: {
                id
            },
            data: {
                title,
                job,
                stacks,
                startTime,
                endTime,
                describe,
                highlight,
                createdById,
                imageUrl: JSON.stringify(newImageUrl)
            }
        });
        return NextResponse.json({message: "更新成功"});
    } catch (error) {
        // 如果发生错误，返回404
        throw new Error("服务器出错")
    }


}


async function saveFiles(files: File[]): Promise<string[]> {
    const imageUrl: string[] = [];
    for (const file of files) {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await new Promise<void>((resolve, reject) => {
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    reject(err);
                } else {
                    imageUrl.push(fileName);
                    resolve();
                }
            });
        });
    }
    return imageUrl;
}

async function deleteFiles(fileNames: string[]): Promise<void> {
    for (const fileName of fileNames) {
        const filePath = path.join(UPLOAD_DIR, fileName);
        try {
            fs.unlinkSync(filePath);
        } catch (err) {
            console.error(`Failed to delete file ${filePath}: ${err.message}`);
        }
    }
}

function extractFormData(formData: FormData) {
    const title = formData.get("title") as string;
    const job = formData.get("job") as string;
    const stacks = formData.get("stacks") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const describe = formData.get("describe") as string;
    const highlight = formData.get("highlight") as string;
    const createdById = Number(formData.get("createdBy"));
    const files = formData.getAll("images[]").filter(item => item instanceof File) as File[];
    return {
        title,
        job,
        stacks,
        startTime,
        endTime,
        describe,
        highlight,
        createdById,
        files,
    };
}
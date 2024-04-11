import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {hash} from "bcrypt";


// 假设您的默认 course 和 wordIndex 值是 0
const defaultCourse = "01";
const defaultWordIndex = 0;

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')
    try {
        if (id) {
            let progress = await prisma.progress.findUnique({
                where: {
                    userId: Number(id)
                }
            })
            if (!progress) {
                progress = await prisma.progress.create({
                    data: {
                        userId: Number(id),
                        course: defaultCourse,
                        wordIndex: defaultWordIndex
                    }
                })
            }
            return NextResponse.json({data: progress});
        }
        return NextResponse.json({error: 'id不存在'}, {status: 400});
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    try {
        const {course, wordIndex, userId} = await request.json()

        const updatedProgress = await prisma.progress.update({
            where: {
                userId // 使用唯一标识符来定位用户
            },
            data: {
                course,
                wordIndex
            }
        });
        return NextResponse.json(updatedProgress)
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}

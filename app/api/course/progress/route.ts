import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";


// 假设您的默认 course 和 wordIndex 值是 0
const defaultCourse = "01";
const defaultWordIndex = 0;

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    try {
        if (id) {
            let progress = await prisma.progress.findFirst({
                where: {
                    createdById: Number(id)
                }
            })
            if (!progress) {
                progress = await prisma.progress.create({
                    data: {
                        createdBy: {connect: {id: Number(id)}},
                        course: defaultCourse,
                        wordIndex: defaultWordIndex
                    }
                })
            }
            return NextResponse.json({
                progress: progress,
            });
        }
        return NextResponse.json({error: '数据不存在'}, {status: 400});
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser || !currentUser.id) {
        throw new Error('Current user ID is undefined or user is not authenticated');
    }
    try {
        const {course, wordIndex} = await request.json()

        const updatedProgress = await prisma.progress.update({
            where: {
                createdById: currentUser.id // 使用唯一标识符来定位用户
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

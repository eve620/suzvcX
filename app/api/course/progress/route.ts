import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";


// 假设您的默认 course 和 wordIndex 值是 0
const defaultCourse = "01";
const defaultWordIndex = 0;

export async function GET(request: NextRequest) {
    const currentUser = await getCurrentUser()
    try {
        if (currentUser) {
            let progress = await prisma.progress.findUnique({
                where: {
                    userId: currentUser.id
                }
            })
            if (!progress) {
                progress = await prisma.progress.create({
                    data: {
                        userId: currentUser.id,
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
    const currentUser = await getCurrentUser()
    try {
        const {course, wordIndex} = await request.json()

        const updatedProgress = await prisma.progress.update({
            where: {
                userId: currentUser?.id // 使用唯一标识符来定位用户
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

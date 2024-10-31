import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";


// 假设您的默认 course 和 wordIndex 值是 0
const defaultCourse = "01";
const defaultWordIndex = 0;

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    if (!id) throw new Error("无用户")

    try {
        let progress = await prisma.progress.findFirst({
            where: {
                createdById: id
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
    } catch (e) {
        throw new Error("查询失败")
    }
}

export async function PUT(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser || !currentUser.id) throw new Error("无用户")

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
        throw new Error("更新失败")
    }
}

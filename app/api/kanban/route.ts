import {NextRequest, NextResponse} from "next/server";

import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get('id'))
    if (!id) return NextResponse.json({message: "无用户"}, {status: 200});
    try {
        let events = await prisma.event.findMany({
            where: {
                createdById: id,
            }
        })
        const data = events.map((item) => {
            return {
                id: item.id,
                title: item.title,
                toDo: JSON.parse(item.toDo),
                inProgress: JSON.parse(item.inProgress),
                completed: JSON.parse(item.completed),
            }
        })
        return NextResponse.json({data}, {status: 200});
    } catch (error) {
        // 如果发生错误，返回404
        return NextResponse.json({message: '查询失败'}, {status: 500});
    }
}

export async function PUT(request: NextRequest,response: NextResponse) {
    const currentUser = await getCurrentUser()
    if (!currentUser || !currentUser.id) {
        return NextResponse.json({message: '未登录'}, {status: 200});
    }
    try {
        const {events} = await request.json()
        for (const event of events) {
            const upsertEvent = await prisma.event.upsert({
                // 设定查找条件，这里使用title作为示例，实际中推荐使用ID
                where: {
                    title_createdById: {
                        title: event.title,
                        createdById: currentUser.id,
                    }
                },
                // 如果找到匹配项，这些字段将被更新
                update: {
                    toDo: JSON.stringify(event.toDo),
                    inProgress: JSON.stringify(event.inProgress),
                    completed: JSON.stringify(event.completed),
                },
                // 如果没有找到匹配项，将使用这些字段创建新记录
                create: {
                    title: event.title,
                    toDo: JSON.stringify(event.toDo),
                    inProgress: JSON.stringify(event.inProgress),
                    completed: JSON.stringify(event.completed),
                    createdBy: {connect: {id: currentUser.id}}
                },
            });
        }
        return NextResponse.json({message: 'ok'}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser || !currentUser.id) {
        return NextResponse.json({message: '未登录'}, {status: 200});
    }
    try {
        const {title} = await request.json()
        const deleteEvent = await prisma.event.delete({
            where: {
                title_createdById: {
                    title: title,
                    createdById: currentUser.id,
                }
            }
        })
        return NextResponse.json({message: 'ok'}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: '服务器内部错误'}, {status: 500});
    }
}

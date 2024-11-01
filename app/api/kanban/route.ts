import {NextRequest, NextResponse} from "next/server";

import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get('id'))
    console.log(id)
    if (!id) return NextResponse.error();
    try {
        let events = await prisma.event.findMany({
            where: {
                createdById: id,
            }
        })
        console.log(events)
        const data = events.map((item) => {
            return {
                id: item.id,
                title: item.title,
                toDo: JSON.parse(item.toDo),
                inProgress: JSON.parse(item.inProgress),
                completed: JSON.parse(item.completed),
            }
        })
        return NextResponse.json({data});
    } catch (error) {
        return NextResponse.error();
    }
}

export async function PUT(request: NextRequest, response: NextResponse) {
    const currentUser = await getCurrentUser()
    if (!currentUser || !currentUser.id) return NextResponse.error();
    try {
        const {events} = await request.json()
        console.log(events)
        for (const event of events) {
            console.log(JSON.stringify(event.toDo))
            console.log(JSON.stringify(event.inProgress))
            console.log(JSON.stringify(event.completed))
            console.log(JSON.stringify([]))

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
        return NextResponse.json({message: 'ok'})
    } catch (e) {
        return NextResponse.error();
    }
}

export async function DELETE(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser || !currentUser.id) return NextResponse.error();
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
        return NextResponse.json({message: 'ok'})
    } catch (e) {
        return NextResponse.error();
    }
}

import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser) throw new Error('未登录');
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    try {
        if (id) {
            // 获取特定 note
            const data = await prisma.note.findUnique({
                where: {
                    id,
                }
            });
            return NextResponse.json({data});
        } else {
            const data = await prisma.note.findMany({
                where: {
                    createdById: currentUser.id
                }
            })
            return NextResponse.json({data})
        }
    } catch (error) {
        return NextResponse.json({message: '查询失败'});
    }
}

export async function POST(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser) throw new Error('未登录');
    try {
        const {title, tags, content} = await request.json()
        const note = await prisma.note.create({
            data: {
                title,
                tags,
                content,
                createdById: currentUser.id
            }
        })
        return NextResponse.json({message: "添加成功"});
    } catch (error) {
        return NextResponse.json({message: '添加失败'});
    }
}

export async function PUT(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser) throw new Error('未登录');
    try {
        const {id, title, tags, content} = await request.json()
        const note = await prisma.note.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                tags,
                content,
                createdById: currentUser.id
            }
        })
        return NextResponse.json({message: "编辑成功"});
    } catch (error) {
        return NextResponse.json({message: '编辑失败'});
    }
}


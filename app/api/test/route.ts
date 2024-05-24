import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request:NextRequest){
    try {
        const a=await prisma.user.delete({
            where:{
                id:1
            }
        })
    }catch (e){
        console.log(e)
    }
    return NextResponse.json({message:"aaa"})
}
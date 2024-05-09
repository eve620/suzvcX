import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    console.log(11111)
    return NextResponse.json({message: "hhhhh"})
}
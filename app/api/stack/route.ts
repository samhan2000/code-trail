import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const userId = "user-1"
    const res = await prisma.stack.findMany({
        where: {
            userId: userId
        }
    })

    return NextResponse.json(res)
}
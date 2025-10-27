import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const body = await req.json(); // parses JSON
    const { name, description, userId } = body;

    console.log(req, "Request in Add Stack")
    const res = await prisma.stack.create({
        data: {
            name: name,
            description: description,
            userId: userId
        }
    })

    return NextResponse.json(res)
}
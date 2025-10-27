import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const userId = "user-1"
    const stacks = await prisma.stack.findMany({
        where: { userId },
        select: {
            id: true,
            name: true,
            description: true,
            _count: {
                select: {
                    modules: true,
                },
            },
            modules: {
                select: {
                    _count: {
                        select: { lessons: true }
                    }
                }
            }
        }
    });

    const stackDetails = stacks.map(stack => ({
        id: stack.id,
        name: stack.name,
        description: stack.description,
        totalModules: stack._count.modules,
        totalLessons: stack.modules.reduce((sum, module) => sum + module._count.lessons, 0)
    }));

    return NextResponse.json(stackDetails)
}

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const automations = await prisma.automation.findMany({
      include: {
        listener: true,
        keywords: true,
      },
    })

    const recentActivity = await prisma.activity.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    const responses = await prisma.response.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    const chatHistory = await prisma.chat.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      automations,
      recentActivity,
      responses,
      chatHistory,
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


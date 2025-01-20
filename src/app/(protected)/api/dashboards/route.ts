import { NextResponse } from 'next/server'
import {client} from '@/lib/prisma'

export async function GET() {
  try {
    const automations = await client.automation.findMany({
      include: {
        listener: true,
        keywords: true,
      },
    })

    const recentActivity = await client.automation.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    const responses = await client.dms.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    const chatHistory = await client.automation.findMany({
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


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  let dbStatus = 'disconnected'
  let dbError: string | null = null

  try {
    // Run simple lightweight probe query
    await prisma.$queryRaw`SELECT 1`
    dbStatus = 'connected'
  } catch (error) {
    dbError = error instanceof Error ? error.message : 'Database connection error'
  }

  return NextResponse.json(
    {
      status: 'ok',
      service: 'real-estate-platform',
      database: dbStatus,
      ...(dbError ? { databaseError: dbError } : {}),
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}


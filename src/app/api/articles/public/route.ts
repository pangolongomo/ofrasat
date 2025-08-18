import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const branchType = searchParams.get('branch')

  try {
    const whereClause: Record<string, unknown> = {
      status: 'PUBLISHED'
    }

    if (branchType && branchType !== 'all') {
      whereClause.branch = {
        type: branchType.toUpperCase()
      }
    }

    const articles = await prisma.article.findMany({
      where: whereClause,
      include: {
        branch: true,
        author: { select: { name: true } }
      },
      orderBy: { publishedAt: 'desc' }
    })

    return NextResponse.json(articles)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
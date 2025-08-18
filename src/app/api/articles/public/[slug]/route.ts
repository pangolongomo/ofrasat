import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED'
      },
      include: {
        branch: true,
        author: { select: { name: true } }
      }
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
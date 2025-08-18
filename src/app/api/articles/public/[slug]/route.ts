import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const article = await prisma.article.findUnique({
      where: { 
        slug: params.slug,
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
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
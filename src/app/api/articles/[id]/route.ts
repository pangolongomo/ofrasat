import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/client";

const updateArticleSchema = z.object({
  title: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).optional(),
  featuredImage: z.string().optional(),
  branchId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        branch: true,
        author: { select: { name: true, email: true } },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = updateArticleSchema.parse(body);

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Delete old image if updating with new one
    if (data.featuredImage && existingArticle.featuredImage && data.featuredImage !== existingArticle.featuredImage) {
      try {
        const supabase = createClient();
        const oldFileName = existingArticle.featuredImage.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('articles').remove([oldFileName]);
        }
      } catch {
        // Old image couldn't be deleted, continue anyway
      }
    }

    const updateData: Record<string, unknown> = { ...data };
    if (data.status === "PUBLISHED" && existingArticle.status !== "PUBLISHED") {
      updateData.publishedAt = new Date();
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        branch: true,
        author: { select: { name: true, email: true } },
      },
    });

    // Revalidate relevant pages
    const branchTypes = { 
      "1": "consulting", 
      "2": "finance", 
      "3": "communication" 
    };
    const branchType = branchTypes[article.branchId as keyof typeof branchTypes];
    
    if (branchType) {
      revalidatePath(`/${branchType}`);
    }
    revalidatePath("/dashboard/articles");
    revalidatePath("/articles");
    revalidatePath(`/article/${article.slug}`);

    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: { branch: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Delete the image from Supabase if it exists
    if (article.featuredImage) {
      try {
        const supabase = createClient();
        const fileName = article.featuredImage.split('/').pop();
        if (fileName) {
          await supabase.storage.from('articles').remove([fileName]);
        }
      } catch {
        // Image couldn't be deleted from Supabase, continue anyway
      }
    }

    await prisma.article.delete({
      where: { id },
    });

    // Revalidate relevant pages
    const branchTypes = { 
      "1": "consulting", 
      "2": "finance", 
      "3": "communication" 
    };
    const branchType = branchTypes[article.branchId as keyof typeof branchTypes];
    
    if (branchType) {
      revalidatePath(`/${branchType}`);
    }
    revalidatePath("/dashboard/articles");
    revalidatePath("/articles");

    return NextResponse.json({ message: "Article deleted" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

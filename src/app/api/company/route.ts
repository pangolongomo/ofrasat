import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const companyInfo = await prisma.companyInfo.findFirst();
    return NextResponse.json(companyInfo);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const companyInfo = await prisma.companyInfo.findFirst();

    if (companyInfo) {
      const updated = await prisma.companyInfo.update({
        where: { id: companyInfo.id },
        data,
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.companyInfo.create({ data });
      return NextResponse.json(created);
    }
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

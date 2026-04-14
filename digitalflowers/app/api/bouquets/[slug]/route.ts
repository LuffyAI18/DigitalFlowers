import { NextRequest, NextResponse } from "next/server";
import { findBouquetBySlug, incrementShareCount } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const bouquet = await findBouquetBySlug(slug);

    if (!bouquet) {
      return NextResponse.json(
        { error: "Bouquet not found or has expired" },
        { status: 404 }
      );
    }

    // Increment share count (fire-and-forget)
    incrementShareCount(slug).catch(() => {});

    return NextResponse.json({ bouquet }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/bouquets/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bouquet" },
      { status: 500 }
    );
  }
}

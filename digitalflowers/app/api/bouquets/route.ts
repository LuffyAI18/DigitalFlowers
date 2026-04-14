import { NextRequest, NextResponse } from "next/server";
import { createBouquet } from "@/lib/storage";
import { generateSlug, generateShareUrl } from "@/utils/slugGenerator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      flowerType,
      flowerColor,
      bouquetStyle,
      wrappingStyle,
      ribbonStyle,
      decorations,
      size,
      arrangementPosition,
      petalDensity,
      message,
    } = body;

    // Validation
    if (!flowerType || !flowerColor || !bouquetStyle || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields: flowerType, flowerColor, bouquetStyle, message" },
        { status: 400 }
      );
    }

    if (message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (message.trim().length > 1000) {
      return NextResponse.json(
        { error: "Message must be 1000 characters or less" },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slug = generateSlug();
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const shareUrl = generateShareUrl(slug, baseUrl);

    // Expiry: 7 days from now
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const bouquet = await createBouquet({
      slug,
      flowerType: flowerType || "rose",
      flowerColor: flowerColor || "classic-red",
      bouquetStyle: bouquetStyle || "small-hand-tied",
      wrappingStyle: wrappingStyle || "kraft-paper",
      ribbonStyle: ribbonStyle || "gold-ribbon",
      decorations: Array.isArray(decorations) ? decorations : [],
      size: size || "medium",
      arrangementPosition: arrangementPosition || "centered",
      petalDensity: petalDensity || "medium",
      message: message.trim(),
      expiresAt: expiresAt.toISOString(),
      shareUrl,
      shareCount: 0,
      published: true,
    });

    return NextResponse.json(
      {
        success: true,
        slug: bouquet.slug,
        shareUrl: bouquet.shareUrl,
        expiresAt: bouquet.expiresAt,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.error("POST /api/bouquets error:", errMsg);
    if (errStack) console.error("Stack:", errStack);
    return NextResponse.json(
      { error: "Failed to create bouquet. Please try again.", details: errMsg },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { deleteExpired } from "@/lib/storage";

export async function DELETE(request: NextRequest) {
  try {
    // Validate secret token for security
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.CLEANUP_SECRET;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedCount = await deleteExpired();

    return NextResponse.json({
      success: true,
      deletedCount,
      timestamp: new Date().toISOString(),
      message: `Cleaned up ${deletedCount} expired bouquet(s)`,
    });
  } catch (error: unknown) {
    console.error("DELETE /api/cleanup error:", error);
    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    );
  }
}

// Also support GET for health check / manual trigger from GitHub Actions
export async function GET(request: NextRequest) {
  return DELETE(request);
}

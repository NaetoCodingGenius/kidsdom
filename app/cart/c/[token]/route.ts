import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const search = req.nextUrl.search;
  const shopifyUrl = `https://9510b3-b1.myshopify.com/cart/c/${token}${search}`;
  return NextResponse.redirect(shopifyUrl, { status: 307 });
}

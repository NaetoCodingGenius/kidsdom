import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, comment } = await req.json();

  if (!email || !comment) {
    return NextResponse.json({ error: "Email and comment are required." }, { status: 400 });
  }

  // Submit to Shopify's contact form endpoint
  const shopifyRes = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "form_type": "contact",
      "utf8": "✓",
      "contact[name]": name ?? "",
      "contact[email]": email,
      "contact[phone]": phone ?? "",
      "contact[body]": comment,
    }).toString(),
  });

  if (shopifyRes.ok) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
}

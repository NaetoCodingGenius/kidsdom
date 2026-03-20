import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, comment } = await req.json();

  if (!email || !comment) {
    return NextResponse.json({ error: "Email and comment are required." }, { status: 400 });
  }

  // Use Shopify Admin API to send a customer inquiry notification
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!;

  const message = [
    `Name: ${name || "Not provided"}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Message: ${comment}`,
  ].join("\n");

  // Create a draft order note as a record, or use customer creation
  // Simplest: use Shopify Admin REST to create a customer with a note
  const res = await fetch(`https://${domain}/admin/api/2026-01/customers.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": privateToken,
    },
    body: JSON.stringify({
      customer: {
        email,
        first_name: name?.split(" ")[0] || "",
        last_name: name?.split(" ").slice(1).join(" ") || "",
        phone: phone || undefined,
        note: `Contact form message:\n${message}`,
        tags: "contact-form",
      },
    }),
  });

  if (res.ok || res.status === 422) {
    // 422 means customer already exists — still counts as received
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Failed to send. Please email us directly." }, { status: 500 });
}

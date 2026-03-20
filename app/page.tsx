"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Star, Puzzle, Brain, Heart } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getAllProducts, ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

const floatingShapes = [
  { emoji: "🧩", top: "12%", left: "7%", delay: "0s", size: 40 },
  { emoji: "⭐", top: "20%", right: "9%", delay: "0.8s", size: 34 },
  { emoji: "🎨", top: "60%", left: "4%", delay: "1.2s", size: 36 },
  { emoji: "🌍", top: "70%", right: "6%", delay: "0.4s", size: 38 },
  { emoji: "✏️", top: "40%", left: "2%", delay: "1.6s", size: 30 },
];

export default function Home() {
  const { addItem, loading } = useCart();
  const [featuredProduct, setFeaturedProduct] = useState<ShopifyProduct | null>(null);

  useEffect(() => {
    getAllProducts().then((products) => { if (products[0]) setFeaturedProduct(products[0]); });
  }, []);

  const variant = featuredProduct?.variants.nodes[0];

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "linear-gradient(135deg, #fff7ed 0%, #fef9c3 50%, #fce7f3 100%)" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: 500, height: 500, background: "rgba(249,115,22,0.12)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", animation: "blob 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: 450, height: 450, background: "rgba(124,58,237,0.1)", borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", animation: "blob 10s ease-in-out infinite reverse", pointerEvents: "none" }} />

        {floatingShapes.map((s, i) => (
          <div key={i} style={{ position: "absolute", top: s.top, left: (s as any).left, right: (s as any).right, fontSize: s.size, animation: `${i % 2 === 0 ? "float" : "floatReverse"} ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: s.delay, pointerEvents: "none", userSelect: "none", opacity: 0.55 }}>
            {s.emoji}
          </div>
        ))}

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "4rem 1.5rem", maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "white", border: "2px solid var(--orange-light)", borderRadius: 999, padding: "0.4rem 1.1rem", marginBottom: "1.75rem", boxShadow: "0 4px 14px rgba(249,115,22,0.15)" }}>
            <span style={{ fontSize: "1rem" }}>✨</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--orange)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Welcome to Kidsdom</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(2.6rem, 8vw, 5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--text)" }}>
            KIDSDOM<br />
            <span style={{ background: "linear-gradient(135deg, var(--orange) 0%, var(--pink) 60%, var(--purple) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              A kingdom for kids
            </span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "var(--text-2)", maxWidth: 540, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Educational toys and puzzles designed to spark curiosity, build skills, and make learning an adventure.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "var(--orange)", color: "white", padding: "0.9rem 2rem", borderRadius: 999, fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 25px rgba(249,115,22,0.4)", transition: "all 0.25s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 35px rgba(249,115,22,0.55)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(249,115,22,0.4)"; }}
            >
              <ShoppingCart size={18} /> Browse our latest products
            </Link>
            <Link href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "white", color: "var(--text)", padding: "0.9rem 2rem", borderRadius: 999, fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "2px solid var(--border)", transition: "all 0.25s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--orange)"; (e.currentTarget as HTMLElement).style.color = "var(--orange)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section style={{ background: "var(--orange)", padding: "1.25rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { icon: <Brain size={18} />, label: "Cognitive Development" },
            { icon: <Puzzle size={18} />, label: "Educational Play" },
            { icon: <Star size={18} />, label: "Age 3 & Above" },
            { icon: <Heart size={18} />, label: "Family Bonding" },
          ].map((v) => (
            <div key={v.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontWeight: 700, fontSize: "0.875rem" }}>
              {v.icon} {v.label}
            </div>
          ))}
        </div>
      </section>

      {/* Featured product */}
      <section style={{ padding: "7rem 1.5rem", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(249,115,22,0.1)", border: "1.5px solid rgba(249,115,22,0.3)", borderRadius: 999, padding: "0.35rem 1rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--orange)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured Products</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)" }}>
                Designed to <span style={{ color: "var(--orange)" }}>Educate & Delight</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem", alignItems: "center" }}>
              <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "2px solid rgba(249,115,22,0.12)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(249,115,22,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.08)"; }}
              >
                <div style={{ position: "relative", height: 320 }}>
                  <Image src="https://kidsdom.ca/cdn/shop/files/WhatsAppImage2024-05-09at11.42.17AM.jpg?v=1715981074&width=533" alt="Map of Nigeria Puzzle" fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 14, left: 14, background: "var(--orange)", color: "white", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.3rem 0.85rem", borderRadius: 999 }}>
                    Sale
                  </div>
                  <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: 999, padding: "0.3rem 0.8rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Star size={12} fill="var(--yellow)" color="var(--yellow)" />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text)" }}>Age 3+</span>
                  </div>
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>Map of Nigeria Puzzle</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem" }}>
                    <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 900, fontSize: "1.5rem", color: "var(--orange)" }}>$25.00 CAD</span>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-3)", textDecoration: "line-through" }}>$30.00 CAD</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    A captivating 70-piece puzzle perfect for children aged 3 and above, featuring vibrant illustrations of Nigeria&apos;s landmarks, cities, and cultural symbols.
                  </p>
                  <button
                    onClick={() => variant && addItem(variant.id)}
                    disabled={!variant || loading}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "var(--orange)", color: "white", padding: "0.85rem", borderRadius: 12, fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", fontFamily: "var(--font-nunito)", transition: "all 0.2s", width: "100%" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--orange-dark)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--orange)"; }}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { emoji: "🧩", title: "70 Pieces", desc: "Sturdy pieces designed for small hands — each one perfectly sized for little fingers to grip and place." },
                  { emoji: "🌍", title: "Geography & Culture", desc: "Explore landmarks, cities, and cultural symbols of Nigeria while developing spatial awareness." },
                  { emoji: "🧠", title: "Cognitive Development", desc: "Promotes problem-solving skills, pattern recognition, and concentration through engaging play." },
                  { emoji: "👨‍👩‍👧", title: "Family Bonding", desc: "Ideal for playtime, learning, and family bonding — discover the wonders of Nigeria together." },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "white", borderRadius: 14, padding: "1.25rem", border: "1.5px solid var(--border)", transition: "border-color 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{item.emoji}</div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.95rem" }}>{item.title}</h4>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery strip */}
      <section style={{ padding: "0 0 7rem" }}>
        <div style={{ display: "flex", gap: "1rem", overflowX: "auto", padding: "3rem 1.5rem 0", scrollbarWidth: "none" }}>
          {[
            "https://kidsdom.ca/cdn/shop/files/WhatsAppImage2024-05-09at11.42.17AM.jpg?v=1715981074&width=533",
            "https://kidsdom.ca/cdn/shop/files/WhatsAppImage2024-03-20at11.34.25AM.jpg?v=1715981074&width=533",
            "https://kidsdom.ca/cdn/shop/files/WhatsAppImage2024-03-13at5.38.20PM.jpg?v=1715981074&width=533",
            "https://kidsdom.ca/cdn/shop/files/IMG_4096.jpg?v=1715981074&width=533",
            "https://kidsdom.ca/cdn/shop/files/IMG_4006.jpg?v=1715981074&width=533",
            "https://kidsdom.ca/cdn/shop/files/IMG_4005.jpg?v=1715981074&width=533",
            "https://kidsdom.ca/cdn/shop/files/WhatsAppImage2024-03-17at9.12.21PM.jpg?v=1715981074&width=533",
          ].map((src, i) => (
            <div key={i} style={{ position: "relative", width: 280, height: 200, flexShrink: 0, borderRadius: 16, overflow: "hidden", border: "2px solid var(--border)", transition: "transform 0.3s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.03)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "none")}
            >
              <Image src={src} alt="Kidsdom product" fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ padding: "0 1.5rem 7rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <div style={{ background: "linear-gradient(135deg, var(--orange) 0%, var(--pink) 60%, var(--purple) 100%)", borderRadius: 24, padding: "4rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.1)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🧩</span>
                <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 900, color: "white", marginBottom: "1.75rem" }}>
                  Start the Adventure Today
                </h2>
                <Link href="/shop"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "white", color: "var(--orange)", padding: "0.9rem 2.25rem", borderRadius: 999, fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  <ShoppingCart size={16} /> Shop Now
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

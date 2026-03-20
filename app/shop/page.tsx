"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getAllProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

function ProductCard({ product }: { product: ShopifyProduct }) {
  const { addItem, loading } = useCart();
  const [imgIndex, setImgIndex] = useState(0);
  const images = product.images.nodes;
  const variant = product.variants.nodes[0];
  const onSale = variant?.compareAtPrice !== null;

  return (
    <Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", alignItems: "start", background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.07)", border: "2px solid rgba(249,115,22,0.1)", marginBottom: "2rem" }}>
        {/* Images */}
        <div>
          {/* Main image with nav */}
          <div style={{ position: "relative", height: 340 }}>
            {images[imgIndex] && (
              <Image src={images[imgIndex].url} alt={images[imgIndex].altText ?? product.title} fill style={{ objectFit: "cover" }} sizes="500px" />
            )}
            {onSale && (
              <div style={{ position: "absolute", top: 14, left: 14, background: "var(--orange)", color: "white", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.3rem 0.9rem", borderRadius: 999 }}>Sale</div>
            )}
            {!variant?.availableForSale && (
              <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.6)", color: "white", fontSize: "0.72rem", fontWeight: 800, padding: "0.3rem 0.9rem", borderRadius: 999 }}>Sold Out</div>
            )}
            {images.length > 1 && (
              <>
                <button onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                  style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div style={{ display: "flex", gap: 4, padding: "4px 4px 0" }}>
              {images.map((img, idx) => (
                <button key={idx} onClick={() => setImgIndex(idx)}
                  style={{ position: "relative", width: 0, flex: 1, aspectRatio: "1", borderRadius: 6, overflow: "hidden", border: `2px solid ${idx === imgIndex ? "var(--orange)" : "transparent"}`, cursor: "pointer", background: "none", padding: 0, transition: "border-color 0.15s" }}>
                  <Image src={img.url} alt={img.altText ?? ""} fill style={{ objectFit: "cover" }} sizes="60px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ padding: "2.5rem 2.5rem 2.5rem 0" }}>
          {product.tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {product.tags.map((t) => (
                <span key={t} style={{ fontSize: "0.72rem", fontWeight: 700, background: "rgba(249,115,22,0.08)", color: "var(--orange)", padding: "0.2rem 0.65rem", borderRadius: 999, border: "1px solid rgba(249,115,22,0.2)" }}>{t}</span>
              ))}
            </div>
          )}

          <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "1.6rem", fontWeight: 900, marginBottom: "0.75rem", color: "var(--text)" }}>{product.title}</h2>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 900, fontSize: "1.75rem", color: "var(--orange)" }}>
              {variant ? formatPrice(variant.price.amount, variant.price.currencyCode) : "—"}
            </span>
            {onSale && variant?.compareAtPrice && (
              <span style={{ fontSize: "1rem", color: "var(--text-3)", textDecoration: "line-through" }}>
                {formatPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: variant?.availableForSale ? "rgba(13,148,136,0.08)" : "rgba(0,0,0,0.05)", border: `1px solid ${variant?.availableForSale ? "rgba(13,148,136,0.2)" : "rgba(0,0,0,0.1)"}`, borderRadius: 8, padding: "0.4rem 0.9rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: variant?.availableForSale ? "var(--teal)" : "#999" }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: variant?.availableForSale ? "var(--teal)" : "#999" }}>{variant?.availableForSale ? "In Stock" : "Sold Out"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "0.4rem 0.9rem" }}>
              <Star size={12} fill="var(--yellow)" color="var(--yellow)" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--yellow)" }}>Age 3+</span>
            </div>
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.75, marginBottom: "2rem" }}>{product.description}</p>

          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
            <button
              onClick={() => variant && addItem(variant.id)}
              disabled={!variant?.availableForSale || loading}
              style={{ flex: 1, minWidth: 160, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: variant?.availableForSale ? "var(--orange)" : "#ccc", color: "white", padding: "0.9rem 1.5rem", borderRadius: 12, fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: variant?.availableForSale ? "pointer" : "not-allowed", fontFamily: "var(--font-nunito)", transition: "all 0.2s", boxShadow: variant?.availableForSale ? "0 6px 20px rgba(249,115,22,0.35)" : "none" }}
              onMouseEnter={(e) => { if (variant?.availableForSale) (e.currentTarget as HTMLElement).style.background = "var(--orange-dark)"; }}
              onMouseLeave={(e) => { if (variant?.availableForSale) (e.currentTarget as HTMLElement).style.background = "var(--orange)"; }}
            >
              <ShoppingCart size={16} /> {variant?.availableForSale ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAllProducts().then(setProducts).finally(() => setFetching(false));
  }, []);

  const inStock = products.filter((p) => p.variants.nodes[0]?.availableForSale).length;

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", padding: "5rem 1.5rem 3rem", background: "linear-gradient(135deg, #fff7ed 0%, #fef9c3 100%)", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "rgba(249,115,22,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "white", border: "2px solid rgba(249,115,22,0.3)", borderRadius: 999, padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>
            <ShoppingCart size={14} color="var(--orange)" />
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--orange)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Collection: Products</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, color: "var(--text)", marginBottom: "0.75rem" }}>
            Our <span style={{ color: "var(--orange)" }}>Products</span>
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Browse our latest products — educational toys designed to ignite young minds.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ borderBottom: "1px solid var(--border)", background: "white", padding: "0.9rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-2)", fontWeight: 600 }}>
            <Filter size={15} />
            <span>{products.length} product{products.length !== 1 ? "s" : ""}</span>
            {inStock > 0 && (
              <>
                <span style={{ width: 1, height: 14, background: "var(--border)", display: "inline-block", margin: "0 0.25rem" }} />
                <span style={{ background: "rgba(249,115,22,0.1)", color: "var(--orange)", padding: "0.2rem 0.7rem", borderRadius: 999, fontSize: "0.78rem", fontWeight: 700 }}>In stock ({inStock})</span>
              </>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-2)" }}>
            <span style={{ fontWeight: 600 }}>Sort by:</span>
            <span style={{ fontWeight: 700, color: "var(--text)" }}>Featured</span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "4rem 1.5rem 7rem", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {fetching ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
              <div style={{ width: 44, height: 44, border: "4px solid var(--orange-light)", borderTopColor: "var(--orange)", borderRadius: "50%", animation: "spin-slow 0.7s linear infinite" }} />
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-2)" }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🧩</span>
              <p style={{ fontWeight: 700 }}>No products found</p>
            </div>
          ) : (
            <>
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
              <Reveal delay={0.1}>
                <div style={{ textAlign: "center", padding: "2rem", background: "white", borderRadius: 14, border: "1.5px dashed rgba(249,115,22,0.3)" }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>🚀</span>
                  <p style={{ fontWeight: 700, color: "var(--text-2)", fontSize: "0.9rem" }}>More products coming soon — stay tuned!</p>
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </>
  );
}

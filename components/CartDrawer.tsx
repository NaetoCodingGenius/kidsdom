"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeItem, updateItem, loading } = useCart();
  const lines = cart?.lines.nodes ?? [];

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, backdropFilter: "blur(2px)" }}
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)",
        background: "white", zIndex: 201, display: "flex", flexDirection: "column",
        transform: cartOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
      }}>
        {/* Header */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ShoppingBag size={20} color="var(--orange)" />
            <h2 style={{ fontFamily: "var(--font-poppins)", fontWeight: 800, fontSize: "1.1rem" }}>
              Your Cart {cart && cart.totalQuantity > 0 && <span style={{ background: "var(--orange)", color: "white", borderRadius: 999, fontSize: "0.72rem", fontWeight: 800, padding: "0.1rem 0.55rem", marginLeft: "0.4rem" }}>{cart.totalQuantity}</span>}
            </h2>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", borderRadius: 8, color: "var(--text-2)", transition: "background 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Lines */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {lines.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", color: "var(--text-3)", paddingTop: "3rem" }}>
              <span style={{ fontSize: "3.5rem" }}>🛒</span>
              <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-2)" }}>Your cart is empty</p>
              <p style={{ fontSize: "0.85rem" }}>Add something from the shop!</p>
            </div>
          ) : lines.map((line) => {
            const img = line.merchandise.product.images.nodes[0];
            return (
              <div key={line.id} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "var(--bg)", borderRadius: 12, padding: "0.85rem", border: "1.5px solid var(--border)" }}>
                {img && (
                  <div style={{ position: "relative", width: 72, height: 72, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    <Image src={img.url} alt={img.altText ?? line.merchandise.product.title} fill style={{ objectFit: "cover" }} sizes="72px" />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.2rem", color: "var(--text)" }}>{line.merchandise.product.title}</p>
                  {line.merchandise.title !== "Default Title" && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-3)", marginBottom: "0.4rem" }}>{line.merchandise.title}</p>
                  )}
                  <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--orange)" }}>
                    {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                  </p>
                  {/* Quantity controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.6rem" }}>
                    <button onClick={() => updateItem(line.id, line.quantity - 1)} disabled={loading}
                      style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid var(--border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--orange)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                    ><Minus size={12} /></button>
                    <span style={{ fontWeight: 700, fontSize: "0.875rem", minWidth: 20, textAlign: "center" }}>{line.quantity}</span>
                    <button onClick={() => updateItem(line.id, line.quantity + 1)} disabled={loading}
                      style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid var(--border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--orange)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                    ><Plus size={12} /></button>
                    <button onClick={() => removeItem(line.id)} disabled={loading}
                      style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", padding: "0.25rem", borderRadius: 6, transition: "color 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ef4444")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
                    ><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: "var(--text-2)", fontSize: "0.9rem" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 900, fontSize: "1.1rem", color: "var(--text)" }}>
                {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-3)", textAlign: "center" }}>Taxes and shipping calculated at checkout</p>
            <a href={cart.checkoutUrl}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "var(--orange)", color: "white", padding: "1rem", borderRadius: 12, fontWeight: 800, fontSize: "1rem", textDecoration: "none", transition: "all 0.2s", boxShadow: "0 6px 20px rgba(249,115,22,0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--orange-dark)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--orange)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              Checkout →
            </a>
            <button onClick={() => setCartOpen(false)}
              style={{ background: "none", border: "1.5px solid var(--border)", padding: "0.75rem", borderRadius: 12, fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "var(--font-nunito)", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--orange)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {loading && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 0 }}>
            <div style={{ width: 36, height: 36, border: "3px solid var(--orange-light)", borderTopColor: "var(--orange)", borderRadius: "50%", animation: "spin-slow 0.7s linear infinite" }} />
          </div>
        )}
      </div>
    </>
  );
}

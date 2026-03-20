"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart, setCartOpen } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(254,252,232,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <Image src="https://kidsdom.ca/cdn/shop/files/kidzzzcolour_1.png?v=1710955696&width=600" alt="Kidsdom Logo" width={110} height={40} style={{ objectFit: "contain" }} />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{
              padding: "0.45rem 1rem", borderRadius: 999, fontWeight: 700, fontSize: "0.875rem", textDecoration: "none",
              color: pathname === l.href ? "white" : "var(--text)",
              background: pathname === l.href ? "var(--orange)" : "transparent",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { if (pathname !== l.href) (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.1)"; }}
              onMouseLeave={(e) => { if (pathname !== l.href) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >{l.label}</Link>
          ))}

          {/* Cart button */}
          <button onClick={() => setCartOpen(true)}
            style={{ position: "relative", marginLeft: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 999, background: "var(--orange)", color: "white", border: "none", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 14px rgba(249,115,22,0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(249,115,22,0.55)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(249,115,22,0.35)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            aria-label="Open cart"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, background: "var(--purple)", color: "white", borderRadius: 999, fontSize: "0.65rem", fontWeight: 900, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>
                {itemCount}
              </span>
            )}
          </button>

          <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "var(--text)" }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {open && (
        <div style={{ background: "rgba(254,252,232,0.98)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--border)", padding: "1rem 1.5rem 1.5rem" }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "0.75rem 0", fontWeight: 700, fontSize: "1rem", textDecoration: "none", color: pathname === l.href ? "var(--orange)" : "var(--text)", borderBottom: "1px solid var(--border)" }}
            >{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}

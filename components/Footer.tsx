"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "var(--dark)", color: "white", borderTop: "4px solid var(--orange)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "1rem", textDecoration: "none" }}>
              <Image src="https://kidsdom.ca/cdn/shop/files/kidzzzcolour_1.png?v=1710955696&width=600" alt="Kidsdom" width={120} height={44} style={{ objectFit: "contain" }} />
            </Link>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Igniting Young Minds, one Adventure at a Time.
            </p>
            <a href="https://www.instagram.com/kidsdom/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--orange)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              <Instagram size={16} />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>Navigation</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Contact", href: "/contact" }].map((l) => (
                <Link key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--orange)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>Policies</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Refund Policy", href: "https://kidsdom.ca/policies/refund-policy" },
                { label: "Privacy Policy", href: "https://kidsdom.ca/policies/privacy-policy" },
                { label: "Terms of Service", href: "https://kidsdom.ca/policies/terms-of-service" },
              ].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--orange)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >{l.label}</a>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>We Accept</h4>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
              Visa · Mastercard · American Express · Apple Pay · Google Pay · PayPal · Shop Pay · Discover · Diners Club
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} The Kidsdom store</p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>Canada · CAD $</p>
        </div>
      </div>
    </footer>
  );
}

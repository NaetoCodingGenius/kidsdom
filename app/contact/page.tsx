"use client";

import { useState } from "react";
import { Instagram, Send, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mbdzbzqd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.comment,
        }),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", comment: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", padding: "5rem 1.5rem 3rem", background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 50%, #fef9c3 100%)", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 350, height: 350, background: "rgba(236,72,153,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 280, height: 280, background: "rgba(124,58,237,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "white", border: "2px solid rgba(236,72,153,0.3)", borderRadius: 999, padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>
            <MessageCircle size={14} color="var(--pink)" />
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--pink)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Get in Touch</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, color: "var(--text)", marginBottom: "0.75rem" }}>
            Contact <span style={{ color: "var(--pink)" }}>Us!</span>
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: "1rem", maxWidth: 420, margin: "0 auto" }}>
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "5rem 1.5rem 7rem", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          {/* Contact form */}
          <Reveal direction="left">
            <div style={{ background: "white", borderRadius: 20, padding: "2.5rem", boxShadow: "0 8px 40px rgba(0,0,0,0.07)", border: "2px solid rgba(236,72,153,0.1)" }}>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.75rem", color: "var(--text)" }}>Send Us a Message</h2>

              {sent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🎉</span>
                  <p style={{ fontWeight: 700, color: "var(--teal)", fontSize: "1.1rem" }}>Thanks! We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your name", required: false },
                    { id: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
                    { id: "phone", label: "Phone number", type: "tel", placeholder: "+1 (000) 000-0000", required: false },
                  ].map((f) => (
                    <div key={f.id}>
                      <label style={{ display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text)" }}>
                        {f.label}{f.required && <span style={{ color: "var(--orange)" }}> *</span>}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.required}
                        value={(form as any)[f.id]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: "0.9rem", fontFamily: "var(--font-nunito)", outline: "none", transition: "border-color 0.2s", background: "var(--bg)" }}
                        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--pink)")}
                        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--border)")}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text)" }}>Comment</label>
                    <textarea
                      placeholder="Write your message here..."
                      rows={5}
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: "0.9rem", fontFamily: "var(--font-nunito)", outline: "none", resize: "vertical", transition: "border-color 0.2s", background: "var(--bg)" }}
                      onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--pink)")}
                      onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--border)")}
                    />
                  </div>

                  {error && (
                    <p style={{ fontSize: "0.82rem", color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "0.6rem 0.9rem" }}>{error}</p>
                  )}
                  <button type="submit" disabled={submitting}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "linear-gradient(135deg, var(--pink), var(--purple))", color: "white", padding: "0.9rem", borderRadius: 12, fontWeight: 800, fontSize: "0.95rem", border: "none", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "var(--font-nunito)", transition: "all 0.2s", boxShadow: "0 6px 20px rgba(236,72,153,0.35)", opacity: submitting ? 0.7 : 1 }}
                    onMouseEnter={(e) => { if (!submitting) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 30px rgba(236,72,153,0.5)"; }}}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(236,72,153,0.35)"; }}
                  >
                    <Send size={16} /> {submitting ? "Sending..." : "Send"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info panel */}
          <Reveal direction="right">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Instagram */}
              <a href="https://www.instagram.com/kidsdom/" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "1rem", background: "white", borderRadius: 16, padding: "1.5rem", border: "2px solid var(--border)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(236,72,153,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg, #f97316, #ec4899, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Instagram size={22} color="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.2rem" }}>Follow us on Instagram</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>@kidsdom</p>
                </div>
              </a>

              {/* Email fallback */}
              <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "2px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail size={22} color="var(--orange)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text)" }}>Drop us a message</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>Use the form or reach out directly</p>
                  </div>
                </div>
                <a href="https://kidsdom.ca/pages/contact" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "var(--orange)", color: "white", padding: "0.75rem", borderRadius: 10, fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--orange-dark)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--orange)")}
                >
                  Contact on Kidsdom.ca →
                </a>
              </div>

              {/* Payments accepted */}
              <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "2px solid var(--border)" }}>
                <p style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--text)", marginBottom: "0.75rem" }}>We accept</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-2)", lineHeight: 1.9 }}>
                  Visa · Mastercard · American Express<br />Apple Pay · Google Pay · PayPal<br />Shop Pay · Discover · Diners Club
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: {
    template: "%s | KIDSDOM",
    default: "KIDSDOM | A kingdom for kids",
  },
  description: "Igniting Young Minds, one Adventure at a Time. Educational toys and puzzles for children.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main style={{ flex: 1, paddingTop: 70 }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

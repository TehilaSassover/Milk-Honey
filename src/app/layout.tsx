// app/layout.tsx
import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "GKI Milk & Honey Shop",
  description: "Ecommerce sample using Fake Store API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>{children}</main>
      </body>
    </html>
  );
}

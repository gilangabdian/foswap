import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoSwap - Ubah Foto Jadi Video Estetik",
  description: "Bikin video keren dari kumpulan fotomu dengan otomatis dan gampang banget pakai FoSwap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}

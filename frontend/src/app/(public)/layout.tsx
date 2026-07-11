import type { Metadata } from "next";
import Navbar from "@/components/public/navbar";
import Footer from "@/components/public/footer";



export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

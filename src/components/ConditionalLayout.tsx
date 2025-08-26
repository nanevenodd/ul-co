"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current path is admin route
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/test-admin');
  
  if (isAdminRoute) {
    // Admin routes: no header/footer
    return <>{children}</>;
  }
  
  // Public routes: with header/footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

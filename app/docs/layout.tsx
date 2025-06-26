import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
        {/* Main Content */}
        <main className="flex-1 lg:ml-80 bg-slate-900">
          <div className="container mx-auto px-4 py-8 max-w-4xl bg-slate-900">{children}</div>
        </main>
      </div>
    </div>
  );
}

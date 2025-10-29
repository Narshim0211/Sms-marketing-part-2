import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalonSMS",
  description: "AI-Powered SMS Marketing for Salons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-white/10">
          <div className="container flex items-center justify-between py-4">
            <div className="text-lg font-semibold tracking-tight">SalonSMS</div>
            <nav className="flex gap-4 text-sm text-white/80">
              <a href="/" className="hover:text-white">Dashboard</a>
              <a href="/campaigns" className="hover:text-white">Campaigns</a>
              <a href="/contacts" className="hover:text-white">Contacts</a>
              <a href="/automations" className="hover:text-white">Automations</a>
              <a href="/reports" className="hover:text-white">Reports</a>
              <a href="/settings" className="hover:text-white">Settings</a>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}

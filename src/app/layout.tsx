import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omni Link — Autonomous Coordination Platform",
  description:
    "AI-powered operations platform that coordinates donations, volunteers, NGOs, shelters, and transport workflows autonomously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-dark-900 grid-bg">
        {children}
      </body>
    </html>
  );
}

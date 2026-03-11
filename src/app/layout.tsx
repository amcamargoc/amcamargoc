import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alberto Camargo | Neovim TUI",
  description: "Minimal, futuristic, dark mode developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-tui-bg text-white font-mono overflow-hidden h-screen flex flex-col uppercase selection:bg-tui-cyan selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
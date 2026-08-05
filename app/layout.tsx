import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "性缩力实验室｜娱乐性吸引力自测",
  description: "综合生活方式与相处体验，生成可解释的娱乐性性缩力分数。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

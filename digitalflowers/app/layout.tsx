import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigitalFlowers – Send Love That Blooms",
  description: "Create a beautiful digital bouquet, personalize it with a heartfelt note, and share a link that blooms for your loved one. Expires in 7 days, making every moment precious.",
  keywords: "digital flowers, virtual bouquet, send flowers online, love note, digital gifting",
  openGraph: {
    title: "DigitalFlowers – Send Love That Blooms",
    description: "Create a beautiful digital bouquet and share it with someone special.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}

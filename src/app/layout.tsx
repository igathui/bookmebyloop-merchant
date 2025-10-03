import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const fontSans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "100",
});

// const fontSerif = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "BookMe! by Loop",
  description:
    "A Web Application Concept for a Mini-App for the Loop Merchant Platform. This application is the merchant side of an appointment booking application where businesses can manage their clientele. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>{children}</body>
    </html>
  );
}

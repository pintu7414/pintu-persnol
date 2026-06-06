import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pintu Singh | Senior Data & Agentic AI Engineer | Healthcare AI Specialist",
  description:
    "Portfolio of Pintu Singh, a Senior Data Engineer (Data Engineer 3 at Komodo Health) specializing in Agentic AI, Spark optimization (10B+ records), LangGraph orchestration, RAG, and large-scale cloud-native healthcare analytics systems.",
  keywords: [
    "Senior Data Engineer",
    "Healthcare Data Engineer",
    "Agentic AI Engineer",
    "AI Engineer",
    "Generative AI Engineer",
    "LangChain Expert",
    "LangGraph Developer",
    "RAG Engineer",
    "Spark Expert",
    "Azure Data Engineer",
    "Databricks Engineer",
    "Healthcare Analytics",
    "MCP Servers",
    "Komodo Health",
    "UnitedHealth Group",
    "Optum",
  ],
  authors: [{ name: "Pintu Singh" }],
  openGraph: {
    title: "Pintu Singh | Senior Data & Agentic AI Engineer",
    description: "Building Intelligent Healthcare Data Systems with Agentic AI and Distributed Platforms.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pintu Singh | Senior Data & Agentic AI Engineer",
    description: "Building Intelligent Healthcare Data Systems with Agentic AI and Distributed Platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

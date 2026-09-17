import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CartProvider } from "@/lib/cart-context";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "نیرا عطر صحرا | خانه رایحه‌های اصیل و سفارشی",
  description:
    "نیرا، جادویی از رایحه برای لحظات خاص زندگی. از عطرهای اورجینال برندهای جهانی و پک بازرگانی اقتصادی نیرا تا طراحی و تولید اختصاصی عطر سازمانی برای برند شما.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <NewsletterSignup />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

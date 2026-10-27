import type { Metadata } from "next";
import "@fontsource-variable/golos-text";
import "@fontsource-variable/martian-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "[Название бренда] — Шаблон магазина",
  description:
    "Структурный шаблон магазина физических товаров. Каждое название, цена и число — демо-значение: ничего здесь не описывает реальный товар.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
/* референсные шрифты: Archivo (дисплей+санс) и Azeret Mono (моно);
   кириллические дублёры: Roboto Flex (дисплей, ось wdth), Golos Text (санс), Martian Mono (моно) */
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/roboto-flex/wdth.css";
import "@fontsource-variable/azeret-mono";
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
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* тема до первой отрисовки: default тёмная, «light» — из localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}

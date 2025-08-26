// src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto, Fjalla_One } from "next/font/google";
import "./globals.css";
import Cabecalho from "@/components/Cabecalho";

/* Configura variáveis para as fontes */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const fjallaOne = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fjalla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PetShop",
  description: "Mini portal do PetShop com notícias, produtos e muito mais",
  keywords: ["petshop", "animais", "cachorros", "gatos"],
  authors: [
    {
      name: "Tiago",
      url: "https://github.com/tiagotecinternet24",
    },
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "petshop",
    /* Se tivéssemos ícones específicos para dispositivos Apples, vc também colocaria aqui. */
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${fjallaOne.variable}`}>
        <Cabecalho />
        <main className="limitador">{children}</main>
      </body>
    </html>
  );
}

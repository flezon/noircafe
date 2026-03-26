import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menú | NOIR CAFÉ",
  description: "Explore nuestra colección nocturna de cafés de origen único, tuestes artesanales y bebidas de autor.",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

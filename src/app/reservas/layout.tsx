import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar Mesa | NOIR CAFÉ",
  description: "Reserve su mesa para vivir la experiencia completa del ritual del café. Disponibilidad limitada para barra y mesas privadas.",
};

export default function ReservasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

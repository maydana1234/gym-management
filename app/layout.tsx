import "./globals.css";

export const metadata = {
  title: "Gym Management",
  description: "Gestión de miembros del gimnasio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
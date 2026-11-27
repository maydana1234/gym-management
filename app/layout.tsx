import "./globals.css";
import FloatingAddButton from "../components/FloatingAddButton";

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
      <body>
        {children}
        <FloatingAddButton />
      </body>
    </html>
  );
}
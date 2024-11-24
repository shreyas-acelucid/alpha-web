import type { Metadata } from "next";
import "./styles/globals.css";
import AppLayout from "./components/layout/AppLayout";

export const metadata: Metadata = {
  title: "Alpha Nutrition",
  description: "Nutrition app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

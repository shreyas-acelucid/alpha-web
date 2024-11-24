import type { Metadata } from "next";
import "./styles/globals.css";
import AppLayout from "./components/layout/AppLayout";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="toaster-wrapper"
          containerStyle={{}}
          toastOptions={{
            className: "single-toaster",
            duration: 5000,
            icon: null,
            style: { background: "#ffc107", color: "#fff" },
            success: { style: { background: "#091f2c", color: "#fff" } },
            error: { style: { background: "#f4364c", color: "#fff" } },
          }}
        />
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

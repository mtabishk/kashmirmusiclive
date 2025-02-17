import type { Metadata } from "next";
import { Belleza } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "@/providers/auth-context-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import "react-quill/dist/quill.snow.css";

const belleza = Belleza({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kashmir Music Live",
  description: "Kashmir Music Live",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.jpg",
        href: "/logo.jpg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.jpg",
        href: "/logo.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={belleza.className}>
        <AuthContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ModalProvider />
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

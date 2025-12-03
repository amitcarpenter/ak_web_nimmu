import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | ATLA KNOTS EVENTIVE",
    default: "ATLA KNOTS EVENTIVE - We Design Experiences. We Deliver Impact.",
  },
  description:
    "Premier event management and experiential marketing agency. Creating memorable events, activations, and communications across India. Event & Entertainment, Experiential Marketing, Rural Communication, Exhibition Design.",
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#E84C6F" showSpinner={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

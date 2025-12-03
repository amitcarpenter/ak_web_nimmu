"use client";

import type { PropsWithChildren } from "react";
import { UserHeader } from "@/components/Layouts/user-header";
import { UserFooter } from "@/components/Layouts/user-footer";
import { Providers } from "@/app/providers";
import NextTopLoader from "nextjs-toploader";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { motion } from "framer-motion";
import "@/css/satoshi.css";
import "@/css/style.css";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <NextTopLoader color="#DC2626" showSpinner={false} />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <UserHeader />
        <motion.main
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
        <UserFooter />
      </div>
      <ScrollToTop />
    </Providers>
  );
}


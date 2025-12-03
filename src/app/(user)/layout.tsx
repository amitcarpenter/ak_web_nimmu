import type { PropsWithChildren } from "react";
import { UserHeader } from "@/components/Layouts/user-header";
import { UserFooter } from "@/components/Layouts/user-footer";
import { Providers } from "@/app/providers";
import NextTopLoader from "nextjs-toploader";
import "@/css/satoshi.css";
import "@/css/style.css";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <NextTopLoader color="#E84C6F" showSpinner={false} />
      <div className="flex min-h-screen flex-col">
        <UserHeader />
        <main className="flex-1">
          {children}
        </main>
        <UserFooter />
      </div>
    </Providers>
  );
}


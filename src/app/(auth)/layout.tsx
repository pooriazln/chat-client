import type { Metadata } from "next";
import { montserrat } from "@/styles/theme/fonts";
import { PropsWithChildren } from "react";
import { Providers } from "@/components/providers/Providers";
import { GET_TOKEN } from "@/actions/token.actions";
import { redirect } from "next/navigation";
import { AuthFab } from "@/app/(auth)/components/Fab";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function validateToken() {
  const token = await GET_TOKEN();
  if (token) redirect("/login");
}

export default async function AuthLayout({ children }: PropsWithChildren) {
  await validateToken();

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AppRouterCacheProvider>
          <Providers>
            {children}
            <AuthFab />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

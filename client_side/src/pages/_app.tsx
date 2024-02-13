import AppStartLayout from "@/components/layout/AppStartLayout";
import ContextProvider from "@/context/contextProvider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ContextProvider>
          <AppStartLayout>
            <Component {...pageProps} />;
          </AppStartLayout>
        </ContextProvider>
      </SessionProvider>
    </>
  );
}

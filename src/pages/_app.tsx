import { AppProps } from "next/app"
import { Header } from "../components/Header/index";
import { SessionProvider } from "next-auth/react";

import "../styles/global.scss"

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
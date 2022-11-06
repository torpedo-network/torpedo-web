import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContextProvider } from "../components/AppContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [signer, setSigner] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);

  return (
    <AppContextProvider
      value={{ setSigner, setAddress, signer, address, provider, setProvider }}
    >
      <Component {...pageProps} />
      <ToastContainer />
    </AppContextProvider>
  );
}

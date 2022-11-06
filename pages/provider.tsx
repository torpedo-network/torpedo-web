import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppLayout from "../components/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <Head>
        <title>Become a Provider | Torpedo</title>
      </Head>
      <div className="container mx-auto px-4 py-36">
        <h1 className="text-7xl font-bold text-white">
          Join the Torpedo Network
        </h1>
        <p className="text-slate-500 text-4xl mt-7 leading-normal">
          Host a Torpedo node. <br />
          Earn ETH.
        </p>
        <div className="mt-10">
          <Link
            className="border-2 border-blue-500 hover:bg-blue-500/60 bg-blue-500/30 text-white text-xl px-5 py-3 rounded-lg mt-7"
            href="https://github.com/torpedo-network/torpedo-cli"
          >
            download the CLI
          </Link>
        </div>
        <div className="mt-5">
          <p className="text-slate-500 mt-7 leading-normal">
            Looking to rent a VM instead?{" "}
            <Link
              href="/app"
              className="underline hover:text-slate-300 transition-colors"
            >
              Check out our available runtimes.
            </Link>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

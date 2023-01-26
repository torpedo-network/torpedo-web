import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppLayout from "../components/AppLayout";

// TODO: update this with the actual trial link

export default function Trial() {
  return (
    <AppLayout>
      <Head>
        <title>Try it Out | Torpedo</title>
      </Head>
      <div className="container mx-auto px-4 py-36">
        <h1 className="text-7xl font-bold text-white">
          This page is under construction
        </h1>
        <p className="text-slate-500 text-4xl mt-7 leading-normal">
          Check back soon!
        </p>
        {/* <h1 className="text-7xl font-bold text-white">
          Take Torpedo for a spin
        </h1>
        <p className="text-slate-500 text-4xl mt-7 leading-normal">
          Rent a VM for 5 minutes, for free. <br />
          No credit card required.
        </p>
        <div className="mt-10">
          <Link
            className="border-2 border-blue-500 hover:bg-blue-500/60 bg-blue-500/30 text-white text-xl px-5 py-3 rounded-lg mt-7"
            href="/app"
          >
            try it out
          </Link>
        </div> */}
      </div>
    </AppLayout>
  );
}

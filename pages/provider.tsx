import Head from "next/head";
import Image from "next/image";
import AppLayout from "../components/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <Head>
        <title>Providers | Torpedo</title>
      </Head>
      <div className="container mx-auto px-4">
        <p className="text-slate-400 text-2xl mt-10">
          Here are 15 reasons you should become a provider.
        </p>
      </div>
    </AppLayout>
  );
}

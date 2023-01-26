import { Menu, Transition } from "@headlessui/react";
import torpedoLogo from "assets/torpedo_logo.svg";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "./AppContext";

export default function AppHeader() {
  const { setAddress, setSigner, signer, address, setProvider } =
    useAppContext();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      try {
        if (provider.getSigner()) {
          setSigner(provider.getSigner());
          provider.getSigner(0).getAddress().then(setAddress);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [setAddress, setSigner, setProvider]);

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      setSigner(provider.getSigner());
      setAddress(await provider.getSigner().getAddress());
    } catch (error: any) {
      if (error.message.includes("missing provider")) {
        toast(
          "Wallet not found. Please install MetaMask to use this feature.",
          {
            type: "error",
          }
        );
      } else {
        console.log(error);
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      setSigner(null);
      setAddress("");
    } catch (error) {
      console.log(error);
    }
  };
  const getLinkStyles = (path: string) => {
    const active = router.pathname === path ? "border-b-2" : "";
    return (
      "text-white text-xl hover:text-slate-300 transition-colors " + active
    );
  };

  return (
    <div className="mx-auto px-8 py-4 sm:flex justify-between content-center">
      <div className="flex flex-col justify-center">
        <Link href="/">
          <Image src={torpedoLogo} alt="Torpedo logo" height={50} />
        </Link>
      </div>
      <div className="sm:flex flex-col justify-center hidden">
        <h3>
          <Link className={getLinkStyles("/app")} href="/app">
            rent a VM
          </Link>
        </h3>
      </div>
      <div className="sm:flex flex-col justify-center hidden">
        <h3>
          <Link className={getLinkStyles("/provider")} href="/provider">
            become a provider
          </Link>
        </h3>
      </div>
      <div className="sm:flex flex-col justify-center hidden">
        <h3>
          <Link className={getLinkStyles("/trial")} href="/trial">
            try it out
          </Link>
        </h3>
      </div>
      {/* <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> */}

      <div className="sm:inline-block sm:float-right hidden">
        {signer ? (
          <Menu>
            <Menu.Button className="border-2 border-slate-500 py-4 px-8 rounded-full bg-slate-800/50 flex">
              <p className=" text-white ">
                {address.slice(0, 6) +
                  "..." +
                  address.slice(address.length - 4, address.length)}
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ffffff"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute -translate-x-24 translate-y-2">
                <Menu.Item>
                  <div className="w-full bg-white rounded-lg shadow-lg p-4 ">
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-between">
                        <p className="text-slate-400 translate-y-1/4">
                          {address.slice(0, 6) +
                            "..." +
                            address.slice(address.length - 4, address.length)}
                        </p>

                        <button
                          onClick={() => disconnectWallet()}
                          className="whitespace-nowrap border group flex w-full items-center rounded-md px-3 py-2 ml-5 text-sm bg-white"
                        >
                          disconnect wallet
                        </button>
                      </div>
                    </div>
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <button
            className="flex text-white text-xl border-2 border-blue-500 py-4 px-8 rounded-full bg-blue-500/30"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

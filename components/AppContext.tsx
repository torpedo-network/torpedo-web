import { ethers } from "ethers";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

interface AppContextInterface {
  setSigner: (signer: any) => void;
  setAddress: (address: string) => void;
  signer: any;
  address: string;
  provider: any;
  setProvider: (provider: any) => void;
}

function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

const [useAppContext, AppContextProvider] = createCtx<AppContextInterface>();

const connectWallet = async (appContext: AppContextInterface) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    appContext.setSigner(provider.getSigner());
    appContext.setAddress(await provider.getSigner().getAddress());
  } catch (error: any) {
    if (error.message.includes("missing provider")) {
      toast("Wallet not found. Please install MetaMask to use this feature.", {
        type: "error",
      });
    }
    console.log(error);
  }
};

export { useAppContext, AppContextProvider, connectWallet };

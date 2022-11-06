import { createContext, useContext } from "react";

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

export { useAppContext, AppContextProvider };

// useTorpedo hook - can only be used in AppContext.

import { ethers } from "ethers";
import { useContext } from "react";
import { useAppContext } from "../AppContext";
import torpedoAbi from "./abi";

export const useTorpedo = () => {
  // TODO: change to provider. Then add signer when needed.
  const { provider } = useAppContext();

  const torpedoAddress = process.env.NEXT_PUBLIC_TORPEDO_ADDRESS!;
  const torpedoContract = new ethers.Contract(
    torpedoAddress,
    torpedoAbi,
    provider
  );
  // setTorpedo(torpedoContract);
  return torpedoContract;
};

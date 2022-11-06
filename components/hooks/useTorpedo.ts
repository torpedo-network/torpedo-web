// useTorpedo hook - can only be used in AppContext.

import { BigNumber, Contract, ethers } from "ethers";
import { useContext } from "react";
import { useAppContext } from "../AppContext";
import { VMConfig } from "../RecommendedConfig";
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

/**
 * Determine if the torpedo nodes can fulfill a request with the given parameters.
 * @param torpedo Active torpedo contract (does not have to be signed)
 * @param config VMConfig to check
 * @returns true if a torpedo node can satisfy the request, false if not.
 */
export const checkVMConfiguration = async (
  torpedo: Contract,
  config: VMConfig
) => {
  const phaestusNodes = await torpedo.viewAllPhaestus();
  const now = await torpedo.getNow();

  const matchingNodes = phaestusNodes
    .map((node: any) => {
      const { numCPUs, numGPUs, gpuType, endTime } = node;
      console.log("node", node);
      return {
        numCPUs,
        numGPUs,
        gpuType,
        endTime: (endTime as BigNumber).toNumber(),
        maxDurationHours: ((endTime as BigNumber).toNumber() - now) / 3600,
      };
    })
    .filter((node: any) => {
      return (
        node.numCPUs >= config.numCPUs &&
        node.numGPUs >= config.numGPUs &&
        node.gpuType == config.gpuType &&
        node.maxDurationHours >= config.time
      );
    });

  return matchingNodes.length > 0;
};

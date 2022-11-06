import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { torpedoAddress } from "../../config/torpedo_config";
import torpedoAbi from "../hooks/abi";
import PulseLoader from "../widgets/PulseLoader";

const TorpedoStats = () => {
  const [stats, setStats] = useState({
    cpuFlops: 0,
    gpuFlops: 0,
  });
  const loadTorpedoStats = async () => {
    const provider = ethers.getDefaultProvider("goerli");
    const torpedo = new ethers.Contract(torpedoAddress, torpedoAbi, provider);
    const phaestusNodes = await torpedo.viewAllPhaestus();
    console.log(phaestusNodes);
    // TODO: use time somehow
    const cpuCount = phaestusNodes.reduce(
      (acc: number, node: any) => acc + node.numCPUs,
      0
    );
    const gpuCount = phaestusNodes.reduce(
      (acc: number, node: any) => acc + node.numGPUs,
      0
    );
    // TODO: make these real calculations.
    setStats({
      cpuFlops: cpuCount * 30,
      gpuFlops: gpuCount * 30,
    });
  };
  useEffect(() => {
    loadTorpedoStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-12 bg-[#16161d]">
      <div className="md:grid-cols-3 md:grid text-white container mx-auto">
        <div className="flex flex-col justify-center items-center">
          <p>BY THE NUMBERS</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {stats.cpuFlops ? (
            <p className="text-7xl">{stats.cpuFlops}</p>
          ) : (
            <PulseLoader />
          )}

          <p>TFLOPs CPU Power Locked</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {stats.gpuFlops ? (
            <p className="text-7xl">{stats.gpuFlops}</p>
          ) : (
            <PulseLoader />
          )}
          <p>TFLOPs GPU Power Locked</p>
        </div>
      </div>
    </div>
  );
};

export default TorpedoStats;

import { BigNumber, ethers } from "ethers";
import Router from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { ContractContext } from "../generated-types/TorpedoFactory";
import torpedoAbi from "./hooks/abi";
import { useAppContext } from "./AppContext";
import RentalModal from "./rental_modal/RentalModal";
import { useTorpedo } from "./hooks/useTorpedo";

// TODO: use a graph to select VM panumCPUseters

export interface VMConfig {
  numCPUs: number;
  numGPUs: number;
  time: number;
  gpuType: GPUType;
}

export enum GPUType {
  _NONE,
  _3090,
  _A100,
  _K80,
}

export default function RecommendedConfig({
  initialConfig,
  title,
}: {
  initialConfig: VMConfig;
  title: string;
}) {
  const torpedo = useTorpedo();
  const [config, setConfig] = useState<VMConfig>(initialConfig);

  const [ranges, setRanges] = useState({
    numCPUs: [1, 2],
    numGPUs: [1, 2],
    time: [1, 50],
  });

  // Update ranges on startup.
  useEffect(() => {
    updateRanges(initialConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const launchRentalModal = () => {
    setIsOpen(true);
  };

  const constrainRanges = (
    name: "numCPUs" | "numGPUs" | "time",
    value: number
  ) => {
    const [min, max] = ranges[name];
    if (value < min) return min;
    if (value > max) return max;

    return value;
  };

  const updateRanges = async (newConfig: VMConfig) => {
    if (!torpedo.provider) return;
    console.log("Updated ranges");
    const phaestusNodes = await torpedo.viewAllPhaestus();
    const now = await torpedo.getNow();

    const matchingNodes = phaestusNodes
      .map((node: any) => {
        const { numCPUs, numGPUs, gpuType, endTime, phaestusAddress } = node;
        return {
          numCPUs,
          numGPUs,
          gpuType,
          endTime: (endTime as BigNumber).toNumber(),
          maxDurationHours: ((endTime as BigNumber).toNumber() - now) / 3600,
          phaestusAddress,
        };
      })
      .filter((node: any) => {
        return (
          node.numCPUs >= newConfig.numCPUs &&
          node.numGPUs >= newConfig.numGPUs &&
          node.gpuType == newConfig.gpuType &&
          node.maxDurationHours >= newConfig.time
        );
      });

    // update ranges in state based on the filtered list
    const newRanges = matchingNodes.reduce(
      ({ numCPUs, numGPUs, time }: any, node: any) => {
        const {
          numCPUs: nodeNumCPUs,
          numGPUs: nodeNumGPUs,
          maxDurationHours,
        } = node;
        return {
          numCPUs: [1, Math.max(numCPUs[1], nodeNumCPUs)],
          numGPUs: [1, Math.max(numGPUs[1], nodeNumGPUs)],
          time: [1, Math.max(time[1], Math.floor(maxDurationHours))],
        };
      },
      {
        numCPUs: [1, 1],
        numGPUs: [1, 1],
        time: [1, 1],
      }
    );

    setRanges(newRanges);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    const newValue = constrainRanges(name as any, parseInt(value));

    if (newValue !== parseInt((config as any)[name]) && newValue) {
      const newConfig = { ...config, [name]: newValue };
      setConfig(newConfig);
      updateRanges(newConfig);
    }
  };

  return (
    <>
      <RentalModal open={isOpen} setIsOpen={setIsOpen} config={config} />
      <div className="border-2 border-black px-10 py-10 rounded-lg bg-white/50 shadow-lg grid grid-cols-4 gap-4">
        <div className="">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p>Recommended configuration</p>
          <p>
            GPU:{" "}
            <select
              name="gpuType"
              onChange={(e) =>
                setConfig({
                  ...config,
                  gpuType: parseInt(
                    e.target.options[e.target.selectedIndex].value
                  ),
                })
              }
            >
              <option value={1} selected={config.gpuType === GPUType._3090}>
                3090
              </option>
              <option value={2} selected={config.gpuType === GPUType._A100}>
                A100
              </option>
              <option value={3} selected={config.gpuType === GPUType._K80}>
                K80
              </option>
              <option value={0} selected={config.gpuType === GPUType._NONE}>
                None
              </option>
            </select>
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <b>VM Features</b>
          <p>
            Num GPUs:
            <input
              className="w-12 mx-3 border-b-2 border-slate-800 pl-2 focus:outline-none bg-transparent"
              type="number"
              name="numGPUs"
              value={config.numGPUs}
              onChange={handleChange}
            />
          </p>
          <p>
            Num CPUs:
            <input
              className="w-12 mx-3 border-b-2 border-slate-800 pl-2 focus:outline-none bg-transparent"
              type="number"
              name="numCPUs"
              value={config.numCPUs}
              onChange={handleChange}
            />
          </p>
          <p>
            Time:{" "}
            <input
              className="w-12 mx-3 border-b-2 border-slate-800 pl-2 focus:outline-none bg-transparent"
              type="number"
              name="time"
              value={config.time}
              onChange={handleChange}
            />
            hour{config.time > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <b>Specs</b>
          <p>RAM: 16GB</p>
          <p>Storage: 100GB</p>
          <p>some other metric</p>
        </div>

        <div className="col-span-1 flex flex-col justify-center">
          <button
            className="border-blue-500 bg-blue-500/30 hover:bg-blue-500/70 text-slate-700 border-2 py-2 px-4 text-xl rounded transition-all w-3/4"
            onClick={() => launchRentalModal()}
          >
            launch
          </button>
        </div>
      </div>
    </>
  );
}

import { ethers } from "ethers";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useAppContext } from "../components/AppContext";
import AppLayout from "../components/AppLayout";
import RecommendedConfig, { GPUType } from "../components/RecommendedConfig";
import recommendedConfigs from "./recommended_configs";

export default function App() {
  const [filteredConfigs, setFilteredConfigs] = useState(recommendedConfigs);
  const [searchText, setSearchText] = useState("");

  // TODO: always include the custom config option.
  useEffect(() => {
    const tokens = searchText.split(" ");
    const filtered = [
      ...recommendedConfigs
        .slice(0, recommendedConfigs.length - 1)
        .map((config) => {
          return {
            ...config,
            tagMatches: tokens.filter(
              (token) =>
                config.tags.some((tag) => tag.includes(token)) ||
                config.name.includes(token) ||
                config.specs.gpuType.includes(token)
            ).length,
          };
        })
        .filter((config) => config.tagMatches > 0)
        .sort((a, b) => b.tagMatches - a.tagMatches),
      recommendedConfigs[recommendedConfigs.length - 1], // preserve the custom option
    ];
    setFilteredConfigs(filtered);
  }, [searchText]);

  return (
    <AppLayout>
      <Head>
        <title>App | Torpedo</title>
      </Head>
      <div className="bg-white">
        <div className="bg-gradient-to-t from-white to-[#00FFF026] min-h-screen">
          <div className="mx-auto container px-4">
            {/* <div className="col-span-2 bg-white">
            <h1>wallet:</h1>
            <p>{address}</p>
            <h1>wallet balance:</h1>
            <p>0.00 ETH</p>
            <h1>hours of compute used:</h1>
            <p>0.00 hours</p>
          </div> */}

            <div className="grid grid-flow-row gap-5 py-10 px-10">
              <div className="border-2 border-black px-10 py-10 rounded-lg bg-white/10 shadow-lg flex">
                <svg
                  className="inline"
                  width="40"
                  height="40"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.5 40.5C26.4937 40.4992 30.3723 39.1622 33.5183 36.702L43.4092 46.593L46.5908 43.4115L36.6998 33.5205C39.1613 30.3742 40.499 26.4947 40.5 22.5C40.5 12.5753 32.4247 4.5 22.5 4.5C12.5753 4.5 4.5 12.5753 4.5 22.5C4.5 32.4247 12.5753 40.5 22.5 40.5ZM22.5 9C29.9452 9 36 15.0548 36 22.5C36 29.9452 29.9452 36 22.5 36C15.0548 36 9 29.9452 9 22.5C9 15.0548 15.0548 9 22.5 9Z"
                    fill="#3060FF"
                  />
                </svg>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="... search '3090 gpu' or 'stable diffusion setup'"
                  className="bg-white/10 text-2xl focus:outline-none placeholder-gray-500 flex-grow ml-2"
                ></input>
              </div>
              <RecommendedConfigView filteredConfigs={filteredConfigs} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const RecommendedConfigView = ({
  filteredConfigs,
}: {
  filteredConfigs: any[];
}) => {
  return (
    <>
      {filteredConfigs.map((config, i) => {
        return (
          <RecommendedConfig
            key={i}
            title={config.name}
            initialConfig={{
              ...config.specs,
              gpuType: Object.values(GPUType).indexOf(
                "_" + config.specs.gpuType.toUpperCase()
              ),
            }}
          />
        );
      })}
    </>
  );
};

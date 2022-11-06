import { Dialog } from "@headlessui/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { VMConfig } from "./RecommendedConfig";
import torpedoAbi from "./hooks/abi";
import { useAppContext } from "./AppContext";
import { useTorpedo } from "./hooks/useTorpedo";
import torpedoSessionAbi from "./hooks/torpedo_session_abi";
import Spinner from "./widgets/Spinner";
import { toast } from "react-toastify";
import { Client } from "@xmtp/xmtp-js";

// TODO: bundle all transactions into a single permissions request.

export default function RentalModal({
  config,
  open,
  setIsOpen,
}: {
  config: VMConfig;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const { signer, provider, setSigner, setAddress } = useAppContext();

  const [price, setPrice] = useState<number>(0);
  const torpedo = useTorpedo();
  const confirmTransaction = async () => {
    setTransactionLoading(true);

    // get the price in wei
    // TODO: remove the divide by 3600 when we fix the price calculation
    try {
      const xtmp = await Client.create(signer);

      const priceInWei = await torpedo.USDToWei(price);

      const withSigner = torpedo.connect(signer);
      const response = await withSigner.createSession(
        {
          numCPUs: config.numCPUs,
          numGPUs: config.numGPUs,
          gpuType: 2, // later make this config.gpuType
          totalTime: config.time, // TODO: multiply by 3600
          serviceType: 2,
          diskSpace: 1,
          RAM: 1,
        },
        {
          value: priceInWei,
        }
      );
      const res = await response.wait();

      if (res.events) {
        const { address } = res.events[0];
        // const address = "0xe1CEBc768ad81A7aCb99C1590d08EC751AE27375";
        console.log(address);
        const contract = new ethers.Contract(
          address,
          torpedoSessionAbi,
          signer
        );

        // TODO: create a new dialog panel for the progress bar, noting that the transaction was successful

        let status = await contract.status();
        console.log(status);
        while (status != 1) {
          await new Promise((r) => setTimeout(r, 1000));
          status = await contract.status();
          console.log(status);
        }
        console.log(status);

        // get the URL

        const txn = await contract.startSession();
        console.log(txn);

        const conversations = await xtmp.conversations.list();
        for (const conversation of conversations) {
          console.log(
            `New conversation started with ${conversation.peerAddress}`
          );
          const messages = await conversation.messages();
          console.log(messages);
          const message = messages[messages.length - 1];
          const { content } = message;
          console.log(content);
        }

        // const payload = await txn.wait();
        // console.log(payload);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to confirm transaction. Please try again. ", {
        type: "error",
      });
      setTransactionLoading(false);
    }

    setTransactionLoading(false);
  };

  useEffect(() => {
    if (!open) return;
    if (!torpedo.provider) return;
    const checkVMConfig = async (config: VMConfig) => {
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
            node.numCPUs >= config.numCPUs &&
            node.numGPUs >= config.numGPUs &&
            node.gpuType == config.gpuType &&
            node.maxDurationHours >= config.time
          );
        });

      return matchingNodes.length > 0;
    };
    // load price for given vm config
    if (!checkVMConfig(config)) {
      console.log("vm config is not valid");
      // TODO: show error message.
    } else {
      console.log("vm config is valid");
      torpedo
        .calculateUSDCost({
          numCPUs: config.numCPUs,
          numGPUs: config.numGPUs,
          gpuType: 2, // later make this config.gpuType
          totalTime: config.time, // TODO: multiply by 3600
          serviceType: 2,
          diskSpace: 1,
          RAM: 1, // in seconds
        })
        .then((price: BigNumber) => {
          console.log(price.toNumber());
          setPrice(price.toNumber());
          setLoading(false);
        });
    }
  }, [config, torpedo, open]);

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
      }
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!transactionLoading) {
          setIsOpen(false);
        }
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white px-10 py-10">
          <Dialog.Title className="font-bold text-2xl pb-5">
            Complete your order
          </Dialog.Title>

          <Dialog.Description>
            Quote: {config.numCPUs} CPUs, {config.numGPUs} GPUs. Duration:{" "}
            {config.time} hours. You are paying {loading ? "..." : price} USD.
          </Dialog.Description>
          <div>
            <button
              onClick={signer ? confirmTransaction : connectWallet}
              disabled={transactionLoading}
              className="mt-5 px-5 py-3 bg-blue-500/30 border-blue-500 border-2 rounded-xl float-right inline-block"
            >
              {signer ? (
                transactionLoading ? (
                  <Spinner />
                ) : (
                  "Confirm"
                )
              ) : (
                "Connect Wallet"
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 px-5 py-3 bg-slate-500/30 border-slate-500 border-2 rounded-xl float-right inline-block mr-3"
              disabled={transactionLoading}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

const progressText = [
  "Connecting to Torpedo...",
  "Spinning up VM...",
  "Loading image...",
  "Fetching credentials...",
];

const ProgressBar = ({ percent }: { percent: number }) => {
  const [progress, setProgress] = useState(progressText[0]);

  useEffect(() => {
    if (percent < 20) {
      setProgress(progressText[0]);
    } else if (percent < 30) {
      setProgress(progressText[1]);
    } else if (percent < 75) {
      setProgress(progressText[2]);
    } else {
      setProgress(progressText[3]);
    }
  }, [percent]);

  return (
    <div>
      <div className="flex justify-between mb-1 w-full">
        <span className="text-base font-medium text-blue-700 dark:text-white flex-grow">
          {progressText}
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {percent}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

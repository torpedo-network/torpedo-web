import { Dialog } from "@headlessui/react";
import { BigNumber, Contract, ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { VMConfig } from "../RecommendedConfig";
import torpedoAbi from "../hooks/abi";
import { connectWallet, useAppContext } from "../AppContext";
import { checkVMConfiguration, useTorpedo } from "../hooks/useTorpedo";
import torpedoSessionAbi from "../hooks/torpedo_session_abi";
import Spinner from "../widgets/Spinner";
import { toast } from "react-toastify";
import { Client } from "@xmtp/xmtp-js";
import {
  constructParamsFromConfig,
  createSession,
  startSession,
  waitForVMToStart,
} from "./rental_functions";
import TimedProgressBar from "./TimedProgressBar";

// TODO: bundle all transactions into a single permissions request.
// TODO: update to include RAM and storage selectors.

// Steps for connection
// 1. Initialize XMTP client (2s)
// 2. Call createSession and wait for the address (20s)
// 3. Call status() until it returns 1 (30s)
// 4. Call startSession() (10s)
// 5. Read the message with Jupyter URL from XMTP (2s)

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
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    connectClient: "initial",
    createSession: "initial",
    waitForVM: "initial",
    startSession: "initial",
  });

  const [transactionLoading, setTransactionLoading] = useState(false);
  const appContext = useAppContext();
  const { signer } = appContext;

  const [price, setPrice] = useState<number>(0);
  const torpedo = useTorpedo();

  const confirmTransaction = async () => {
    setTransactionConfirmed(true);

    // get the price in wei
    // TODO: remove the divide by 3600 when we fix the price calculation
    try {
      console.log("Creating client");
      setLoadingStates((s) => ({ ...s, connectClient: "started" }));
      const xmtp = await Client.create(signer);
      setLoadingStates((s) => ({ ...s, connectClient: "finished" }));

      console.log("Creating session");
      setLoadingStates((s) => ({ ...s, createSession: "started" }));
      const sessionContract = await createSession(
        torpedo,
        price,
        signer,
        config
      );
      setLoadingStates((s) => ({ ...s, createSession: "finished" }));

      console.log("waiting for VM");
      setLoadingStates((s) => ({ ...s, waitForVM: "started" }));
      await waitForVMToStart(sessionContract);
      setLoadingStates((s) => ({ ...s, waitForVM: "finished" }));

      console.log("starting session");
      setLoadingStates((s) => ({ ...s, startSession: "finished" }));
      const content = await startSession(sessionContract, xmtp);
      setLoadingStates((s) => ({ ...s, startSession: "finished" }));
      // TODO: do something with the URL returned from content.
      console.log(content);
    } catch (err) {
      console.error(err);
      toast("Failed to confirm transaction. Please try again. ", {
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (!open) return;
    if (!torpedo.provider) return;
    // load price for given vm config
    checkVMConfiguration(torpedo, config)
      .then((isValid) => {
        if (!isValid) {
          toast(
            "We couldn't find a Phaestus node to satisfy that request. Try again with different specifications.",
            {
              type: "error",
            }
          );
          setIsOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    torpedo
      .calculateUSDCost(constructParamsFromConfig(config))
      .then((price: BigNumber) => {
        console.log(price.toNumber());
        setPrice(price.toNumber());
        setLoading(false);
      });
  }, [config, torpedo, open, setIsOpen]);

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
          {transactionConfirmed ? (
            <div>
              <Dialog.Title className="font-bold text-2xl pb-5">
                Order Confirmed
              </Dialog.Title>

              <div>
                <TimedProgressBar
                  label="Create chat client"
                  timeEstimate={5}
                  started={loadingStates.connectClient === "started"}
                  finished={loadingStates.connectClient === "finished"}
                />
                <TimedProgressBar
                  label="Creating session"
                  timeEstimate={20}
                  started={loadingStates.createSession === "started"}
                  finished={loadingStates.createSession === "finished"}
                />
                <TimedProgressBar
                  label="Waiting for VM to boot"
                  timeEstimate={30}
                  started={loadingStates.waitForVM === "started"}
                  finished={loadingStates.waitForVM === "finished"}
                />
                <TimedProgressBar
                  label="Starting session"
                  timeEstimate={10}
                  started={loadingStates.startSession === "started"}
                  finished={loadingStates.startSession === "finished"}
                />
              </div>
            </div>
          ) : (
            <>
              <Dialog.Title className="font-bold text-2xl pb-5">
                Complete your order
              </Dialog.Title>

              <Dialog.Description>
                Quote: {config.numCPUs} CPUs, {config.numGPUs} GPUs. Duration:{" "}
                {config.time} hours. You are paying {loading ? "..." : price}{" "}
                USD.
              </Dialog.Description>
              <div>
                <button
                  onClick={
                    signer
                      ? confirmTransaction
                      : () => connectWallet(appContext)
                  }
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
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
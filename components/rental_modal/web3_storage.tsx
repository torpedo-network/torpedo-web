import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Web3Storage } from "web3.storage";
import CheckCircle from "../widgets/CheckCircle";
import SmallSpinner from "../widgets/SmallSpinner";
import Spinner from "../widgets/Spinner";

const Web3StorageComponent = () => {
  const [apiToken, setApiToken] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileStatuses, setFileStatuses] = React.useState({} as any); // map from filename to status

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!apiToken) {
        toast("Please enter an API token to upload files", { type: "error" });
        return;
      }
      // upload the accepted file(s) to Web3.Storage
      const client = new Web3Storage({ token: apiToken });
      setFiles((files) => [...files, ...acceptedFiles]);

      const upload = async () => {
        console.log("Uploading files...");
        console.log(acceptedFiles);
        const rootCid = await client.put(acceptedFiles);
        for (const file of acceptedFiles) {
          setFileStatuses((fileStatuses: any) => ({
            ...fileStatuses,
            [file.name]: "uploaded",
          }));
        }
      };
      upload();
    },
    [apiToken]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const toggleOpen = () => {
    console.log("toggleOpen");
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  const getStyles = () => {
    if (isOpen) {
      return "overflow-hidden max-h-screen";
    } else {
      return "max-h-0 overflow-hidden";
    }
  };

  return (
    <div className="mt-8">
      <div className="border-2 border-slate-200 px-4 py-4 rounded-lg">
        <div className="flex" onClick={() => toggleOpen()}>
          <h1 className="text-sm font-bold cursor-pointer">
            Upload Files to Web3.Storage (optional)
          </h1>
          <div
            className={`transition-transform ${
              isOpen ? "translate-y-2" : "rotate-90 -translate-x-3"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#000000"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div className={getStyles() + " transition-all"}>
          <div className="mt-4"></div>
          <p>
            web3.storage serves as a form of persistent storage for your files
            that you can easily load from your VM.
          </p>
          <div className="mt-4 mb-2">
            <input
              type="text"
              placeholder="web3.storage API Token"
              className="border border-slate-200 rounded-lg w-full px-2 py-1"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
            />
          </div>
          <div
            {...getRootProps()}
            className="w-full h-20 bg-slate-100 rounded-lg border-dashed border-2 border-slate-200 flex justify-center items-center px-5 text-center"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drop some files here, or click to select files</p>
            )}
          </div>
          {files.length > 0 ? (
            <div className="mt-3">
              <h1>Selected Files</h1>
              {files.map((file) => (
                <div
                  className="border-slate-200 border-2 rounded-lg px-2 py-2"
                  key={file.name}
                >
                  {file.name}
                  {file.name in fileStatuses &&
                  fileStatuses[file.name] === "uploaded" ? (
                    <div className="inline-block float-right translate-y-1">
                      <CheckCircle />
                    </div>
                  ) : (
                    <SmallSpinner />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Web3StorageComponent;

const torpedoAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
    ],
    name: "EthToUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "USD",
        type: "uint256",
      },
    ],
    name: "USDToWei",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressToPhaestus",
    outputs: [
      {
        internalType: "address payable",
        name: "phaestusAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "numCPUs",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "numGPUs",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "enum TorpedoFactory.gpuType",
        name: "gpuType",
        type: "uint8",
      },
      {
        internalType: "enum TorpedoFactory.serviceType",
        name: "serviceType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "diskSpace",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RAM",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "numCPUs",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "numGPUs",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "totalTime",
            type: "uint16",
          },
          {
            internalType: "enum TorpedoFactory.gpuType",
            name: "gpuType",
            type: "uint8",
          },
          {
            internalType: "enum TorpedoFactory.serviceType",
            name: "serviceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "diskSpace",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "RAM",
            type: "uint256",
          },
        ],
        internalType: "struct TorpedoFactory.SessionRequest",
        name: "sessionRequest",
        type: "tuple",
      },
    ],
    name: "calculateUSDCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "numCPUs",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "numGPUs",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "totalTime",
            type: "uint16",
          },
          {
            internalType: "enum TorpedoFactory.gpuType",
            name: "gpuType",
            type: "uint8",
          },
          {
            internalType: "enum TorpedoFactory.serviceType",
            name: "serviceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "diskSpace",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "RAM",
            type: "uint256",
          },
        ],
        internalType: "struct TorpedoFactory.SessionRequest",
        name: "sessionRequest",
        type: "tuple",
      },
    ],
    name: "calculateWeiCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkStatusOfPhaestus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "numCPUs",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "numGPUs",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "totalTime",
            type: "uint16",
          },
          {
            internalType: "enum TorpedoFactory.gpuType",
            name: "gpuType",
            type: "uint8",
          },
          {
            internalType: "enum TorpedoFactory.serviceType",
            name: "serviceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "diskSpace",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "RAM",
            type: "uint256",
          },
        ],
        internalType: "struct TorpedoFactory.SessionRequest",
        name: "sessionRequest",
        type: "tuple",
      },
    ],
    name: "createSession",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "deductResources",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "addedTime",
        type: "uint256",
      },
    ],
    name: "extendSession",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getClientSessionAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolTVL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRatePrecision",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSessionAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "phaestusNodes",
    outputs: [
      {
        internalType: "address payable",
        name: "phaestusAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "numCPUs",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "numGPUs",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "enum TorpedoFactory.gpuType",
        name: "gpuType",
        type: "uint8",
      },
      {
        internalType: "enum TorpedoFactory.serviceType",
        name: "serviceType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "diskSpace",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RAM",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "phaestusToActivate",
    outputs: [
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
      {
        internalType: "address",
        name: "sessionAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "numCPUs",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "numGPUs",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "enum TorpedoFactory.gpuType",
        name: "_gpuType",
        type: "uint8",
      },
      {
        internalType: "enum TorpedoFactory.serviceType",
        name: "_serviceType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "diskSpace",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RAM",
        type: "uint256",
      },
    ],
    name: "registerPhaestus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseResources",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "phaestusNode",
        type: "address",
      },
    ],
    name: "toggle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewAllPhaestus",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "phaestusAddress",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "numCPUs",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "numGPUs",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rate",
            type: "uint256",
          },
          {
            internalType: "enum TorpedoFactory.gpuType",
            name: "gpuType",
            type: "uint8",
          },
          {
            internalType: "enum TorpedoFactory.serviceType",
            name: "serviceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "diskSpace",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "RAM",
            type: "uint256",
          },
        ],
        internalType: "struct TorpedoFactory.Phaestus[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "viewPhaestus",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "phaestusAddress",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "numCPUs",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "numGPUs",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rate",
            type: "uint256",
          },
          {
            internalType: "enum TorpedoFactory.gpuType",
            name: "gpuType",
            type: "uint8",
          },
          {
            internalType: "enum TorpedoFactory.serviceType",
            name: "serviceType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "diskSpace",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "RAM",
            type: "uint256",
          },
        ],
        internalType: "struct TorpedoFactory.Phaestus",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export default torpedoAbi;

const recommendedConfigs = [
  {
    name: "Stable Diffusion",
    specs: {
      gpuType: "3090",
      numCPUs: 1,
      numGPUs: 1,
      time: 4, // hours
    },
    tags: ["stable", "diffusion", "art"],
  },
  {
    name: "Language Model Training",
    specs: {
      gpuType: "A100",
      numCPUs: 1,
      numGPUs: 1,
      time: 4, // hours
    },
    tags: ["language", "model", "training"],
  },
  {
    name: "Data Science Experiments",
    specs: {
      gpuType: "none",
      numCPUs: 1,
      numGPUs: 1,
      time: 4, // hours
    },
    tags: ["data", "analysis", "python", "jupyter"],
  },
  {
    name: "Data Science Powerhouse",
    specs: {
      gpuType: "K80",
      numCPUs: 1,
      numGPUs: 1,
      time: 4, // hours
    },
    tags: ["data", "analysis", "python", "jupyter"],
  },
  {
    name: "Custom",
    specs: {
      gpuType: "3090",
      numCPUs: 1,
      numGPUs: 1,
      time: 4, // hours
    },
    tags: ["custom"],
  },
];

export default recommendedConfigs;

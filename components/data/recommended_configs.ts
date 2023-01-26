const recommendedConfigs = [
  {
    name: "Data Analytics",
    specs: {
      gpuType: "none",
      numCPUs: 2,
      numGPUs: 0,
      time: 4, // hours
    },
    tags: ["data", "analytics", "science", "python", "jupyter"],
  },
  {
    name: "ML Experiments",
    specs: {
      gpuType: "A100",
      numCPUs: 1,
      numGPUs: 2,
      time: 4, // hours
    },
    tags: ["machine", "learning", "experiments", "ML", "python", "jupyter"],
  },
  {
    name: "Deep Learning Experiments",
    specs: {
      gpuType: "3090",
      numCPUs: 1,
      numGPUs: 1,
      time: 4, // hours
    },
    tags: ["deep", "learning", "python", "jupyter", "experiments"],
  },
  {
    name: "Deep Learning Powerhouse",
    specs: {
      gpuType: "K80",
      numCPUs: 2,
      numGPUs: 2,
      time: 4, // hours
    },
    tags: ["deep", "learning", "python", "jupyter", "powerhouse"],
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

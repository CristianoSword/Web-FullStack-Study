export const metricJobs = [
  {
    label: "Quarterly scores",
    values: [72, 88, 91, 77],
    weights: [1, 1, 2, 1],
    clamp: { value: 121, min: 0, max: 100 }
  },
  {
    label: "Experiment samples",
    values: [14, 18, 20, 17, 21],
    weights: [1, 2, 2, 1, 3],
    clamp: { value: -5, min: 0, max: 50 }
  }
];

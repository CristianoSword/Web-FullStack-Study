export const arithmeticJobs = [
  {
    label: "Marketing campaign weights",
    left: [0.22, 0.31, 0.18, 0.29],
    right: [180, 240, 130, 205],
    matrix: [
      [1.4, 0.1, 0.0],
      [0.0, 2.1, 0.2],
      [0.0, 0.0, 1.8]
    ],
    score: { value: 134, min: 0, max: 100 }
  },
  {
    label: "Sensor calibration",
    left: [1.5, 2.0, 0.5],
    right: [4.0, 5.5, 8.25],
    matrix: [
      [3.0, 0.0],
      [0.4, 2.6]
    ],
    score: { value: 44, min: 10, max: 40 }
  }
];

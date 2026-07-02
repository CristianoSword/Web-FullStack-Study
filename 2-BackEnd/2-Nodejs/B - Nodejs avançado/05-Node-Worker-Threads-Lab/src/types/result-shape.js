function createResult(workerId, start, end, partial, primeCount) {
  return {
    workerId,
    start,
    end,
    partial,
    primeCount,
  };
}

function createAggregate(results) {
  const sorted = [...results].sort((left, right) => left.workerId - right.workerId);
  return {
    workers: sorted.length,
    primeCount: sorted.reduce((acc, result) => acc + result.primeCount, 0),
    totalSum: sorted.reduce((acc, result) => acc + result.partial, 0),
    chunks: sorted,
  };
}

module.exports = {
  createResult,
  createAggregate,
};

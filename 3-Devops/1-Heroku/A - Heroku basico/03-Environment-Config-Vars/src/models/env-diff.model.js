export const createEnvDiffReport = ({ appName, entries, verificationCommands }) => ({
  appName,
  entries,
  verificationCommands,
  generatedAt: new Date().toISOString()
});

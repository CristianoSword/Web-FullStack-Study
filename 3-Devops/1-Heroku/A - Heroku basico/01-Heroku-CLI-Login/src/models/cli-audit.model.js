export const createCliAuditReport = ({
  serviceName,
  cliInstalled,
  cliVersion,
  emailConfigured,
  apiKeyConfigured,
  authState,
  warnings,
  verificationCommands
}) => ({
  serviceName,
  cliInstalled,
  cliVersion,
  emailConfigured,
  apiKeyConfigured,
  authState,
  warnings,
  verificationCommands,
  timestamp: new Date().toISOString()
});

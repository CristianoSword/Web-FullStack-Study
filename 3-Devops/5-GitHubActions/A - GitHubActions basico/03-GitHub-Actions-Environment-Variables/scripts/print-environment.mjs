const payload = {
  appEnv: process.env.APP_ENV ?? "undefined",
  apiBaseUrl: process.env.API_BASE_URL ?? "undefined",
  deployNote: process.env.DEPLOY_NOTE ?? "undefined",
  secretConfigured: Boolean(process.env.DEMO_TOKEN)
};

console.log(JSON.stringify(payload, null, 2));

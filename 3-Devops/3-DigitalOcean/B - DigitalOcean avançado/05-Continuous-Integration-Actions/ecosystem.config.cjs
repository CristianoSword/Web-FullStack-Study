module.exports = {
  apps: [
    {
      name: "study-app",
      script: "app/server.js",
      instances: 1,
      autorestart: true,
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      }
    }
  ]
};

function buildServer() {
  return {
    plugins: [],
    register(plugin) {
      this.plugins.push(plugin.name || "anonymous-plugin");
    },
  };
}

module.exports = {
  buildServer,
};

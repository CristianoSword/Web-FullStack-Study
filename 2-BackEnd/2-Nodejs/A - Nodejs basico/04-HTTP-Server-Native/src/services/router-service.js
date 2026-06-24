const { routes } = require("../config/routes");
const { buildResponse } = require("../models/response-shape");

function resolveRoute(method, pathname) {
  const route = routes.find((item) => item.method === method && item.path === pathname);

  if (!route) {
    return {
      statusCode: 404,
      payload: buildResponse("Route not found", { method, pathname }),
    };
  }

  if (route.label === "health") {
    return {
      statusCode: 200,
      payload: buildResponse("Server healthy", { uptimeHint: "native-node" }),
    };
  }

  if (route.label === "about") {
    return {
      statusCode: 200,
      payload: buildResponse("About native server", {
        stack: "http module",
        routeCount: routes.length,
      }),
    };
  }

  return {
    statusCode: 200,
    payload: buildResponse("Welcome to the native HTTP server", {
      availableRoutes: routes,
    }),
  };
}

module.exports = {
  resolveRoute,
};

export const tokenStore = {
  "token-admin-root": {
    id: "USR-900",
    name: "Aline Admin",
    role: "admin",
    scopes: ["billing:read", "reports:read", "users:manage"]
  },
  "token-billing-ops": {
    id: "USR-901",
    name: "Bruno Billing",
    role: "analyst",
    scopes: ["billing:read"]
  },
  "token-viewer-basic": {
    id: "USR-902",
    name: "Clara Viewer",
    role: "viewer",
    scopes: []
  }
};

export function createSchemaRegistryClient(config) {
  const baseUrl = config.schemaRegistryUrl.replace(/\/$/, "");

  async function request(path, options = {}) {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/vnd.schemaregistry.v1+json",
        ...(options.headers ?? {})
      },
      ...options
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Schema Registry request failed (${response.status}): ${message}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  return {
    async setCompatibility(subject, compatibility) {
      return request(`/config/${subject}`, {
        method: "PUT",
        body: JSON.stringify({ compatibility })
      });
    },

    async getCompatibility(subject) {
      return request(`/config/${subject}`, {
        method: "GET"
      });
    },

    async registerSchema(subject, schema) {
      return request(`/subjects/${subject}/versions`, {
        method: "POST",
        body: JSON.stringify({
          schema
        })
      });
    },

    async getLatestSchema(subject) {
      return request(`/subjects/${subject}/versions/latest`, {
        method: "GET"
      });
    },

    async testCompatibility(subject, schema) {
      return request(`/compatibility/subjects/${subject}/versions/latest`, {
        method: "POST",
        body: JSON.stringify({
          schema
        })
      });
    },

    async getSchemaById(schemaId) {
      return request(`/schemas/ids/${schemaId}`, {
        method: "GET"
      });
    }
  };
}

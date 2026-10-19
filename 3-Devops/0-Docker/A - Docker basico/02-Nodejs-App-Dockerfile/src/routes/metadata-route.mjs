export const handleMetadata = (_request, response, payload) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(payload));
};

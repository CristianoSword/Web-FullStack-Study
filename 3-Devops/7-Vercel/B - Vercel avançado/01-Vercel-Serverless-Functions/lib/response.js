export function json(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

export function badRequest(response, message) {
  return json(response, 400, {
    error: message
  });
}

export function notFound(response, message) {
  return json(response, 404, {
    error: message
  });
}

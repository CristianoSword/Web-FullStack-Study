export function json(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

export function unauthorized(response, message) {
  return json(response, 401, {
    error: message
  });
}

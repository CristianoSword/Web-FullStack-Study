export default function handler(_request, response) {
  response.status(200).json({
    status: "ok",
    platform: "vercel",
    mode: "cli-setup"
  });
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const res = NextResponse.redirect(new URL("/me", request.url));
  res.cookies.set("mock_session", Buffer.from(email).toString("base64"), {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  return res;
}


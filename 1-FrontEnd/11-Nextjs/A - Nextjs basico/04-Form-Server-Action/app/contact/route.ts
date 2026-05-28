import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "");
  const message = String(form.get("message") ?? "");

  return NextResponse.json({
    ok: true,
    received: { name, message, at: new Date().toISOString() }
  });
}


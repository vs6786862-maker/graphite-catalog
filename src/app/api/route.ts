import { NextResponse } from "next/server";

// Совместимо с output: "export" (статический деплой на хостинг).
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}
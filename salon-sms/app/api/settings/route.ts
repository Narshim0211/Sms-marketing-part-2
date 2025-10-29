import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  senderId: z.string().min(1),
  provider: z.enum(["stub", "twilio"]),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse("Invalid input", { status: 400 });

  const existing = await prisma.salon.findFirst();
  const updated = await prisma.salon.upsert({
    where: { id: existing?.id ?? "default" },
    update: { senderId: parsed.data.senderId, smsProvider: parsed.data.provider },
    create: { id: "default", name: "Default Salon", senderId: parsed.data.senderId, smsProvider: parsed.data.provider },
  });

  return NextResponse.json({ id: updated.id });
}

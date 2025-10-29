import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendSmsToSegment } from "@/lib/sms/send";

const createSchema = z.object({
  name: z.string().min(1),
  messageText: z.string().min(1).max(500),
  scheduledAt: z.string().optional(),
});

export async function GET() {
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ campaigns });
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) return new NextResponse("Invalid input", { status: 400 });

  const { name, messageText, scheduledAt } = parsed.data;

  const campaign = await prisma.campaign.create({
    data: {
      name,
      messageText,
      status: scheduledAt ? "SCHEDULED" : "QUEUED",
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
    },
  });

  if (!scheduledAt) {
    // send immediately to all opted-in contacts for now (MVP)
    await sendSmsToSegment({
      campaignId: campaign.id,
      messageText,
      filter: { optedIn: true },
    });
    await prisma.campaign.update({ where: { id: campaign.id }, data: { status: "SENT" } });
  }

  return NextResponse.json({ id: campaign.id });
}

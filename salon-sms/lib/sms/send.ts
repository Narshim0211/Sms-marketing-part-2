import { prisma } from "@/lib/prisma";
import { createStubProvider } from "./stub";
import { createTwilioProvider } from "./twilio";

export async function sendSmsToSegment(args: {
  campaignId?: string;
  messageText: string;
  filter: { optedIn?: boolean };
}) {
  const salon = await prisma.salon.findFirst();
  const providerName = salon?.smsProvider ?? process.env.SMS_PROVIDER ?? "stub";
  const senderId = salon?.senderId ?? "Salon";

  const provider = providerName === "twilio" ? createTwilioProvider() : createStubProvider();

  const clients = await prisma.client.findMany({
    where: { optedIn: args.filter.optedIn ?? true },
  });

  for (const client of clients) {
    const body = args.messageText
      .replace(/\{\{firstName\}\}/gi, client.firstName ?? "there");

    const result = await provider.send({ to: client.phone, body, senderId });

    await prisma.message.create({
      data: {
        campaignId: args.campaignId ?? null,
        clientId: client.id,
        status: result.ok ? "SENT" : "FAILED",
        externalId: result.id ?? null,
        error: result.error ?? null,
        body,
      },
    });
  }
}

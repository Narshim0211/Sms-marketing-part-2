import { prisma } from "@/lib/prisma";

async function main() {
  const salon = await prisma.salon.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", name: "Default Salon", senderId: "Your Salon", smsProvider: "stub" },
  });

  await prisma.messageTemplate.upsert({
    where: { id: "welcome-template" },
    update: {},
    create: { id: "welcome-template", salonId: salon.id, name: "We Miss You", content: "Hi {{firstName}}, we miss you! 10% off this week." },
  });

  console.log("Seeded.");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });

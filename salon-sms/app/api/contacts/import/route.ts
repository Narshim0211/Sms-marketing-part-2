import { NextResponse } from "next/server";
import Papa from "papaparse";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof Blob)) {
    return new NextResponse("File required", { status: 400 });
  }
  const text = await file.text();

  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  let inserted = 0;

  for (const row of data as any[]) {
    const phone = (row.phone || row.Phone || "").toString().trim();
    if (!phone) continue;

    const firstName = (row.firstName || row.FirstName || row.first_name || "").toString();
    const lastName = (row.lastName || row.LastName || row.last_name || "").toString();
    const email = (row.email || row.Email || "").toString();
    const lastVisitDateRaw = row.lastVisitDate || row.last_visit_date || row.lastVisit || "";
    const lastVisitDate = lastVisitDateRaw ? new Date(lastVisitDateRaw) : null;
    const service = (row.service || row.Service || row.serviceType || "").toString();
    const tags = (row.tags || row.Tags || "").toString().split(/[,;]\s*/).filter(Boolean);

    await prisma.client.upsert({
      where: { phone },
      update: { firstName, lastName, email, lastVisitDate, service, tags },
      create: { phone, firstName, lastName, email, lastVisitDate, service, tags, optedIn: true },
    });
    inserted += 1;
  }

  return NextResponse.json({ inserted });
}

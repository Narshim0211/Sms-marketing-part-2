"use client";
import { useState } from "react";

export default function ContactsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function upload() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/contacts/import", { method: "POST", body: form });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(`Imported ${data.inserted} contacts`);
    } catch (e: any) {
      setError(e.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contacts</h1>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/80">Import CSV</div>
        <p className="text-xs text-white/60 mt-1">Columns: firstName,lastName,phone,email,lastVisitDate,service,tags</p>
        <div className="flex items-center gap-3 mt-3">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
          <button
            disabled={!file || loading}
            onClick={upload}
            className="px-3 py-2 rounded-md bg-brand-primary hover:bg-brand-primary/90 text-white text-sm disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {result && <div className="mt-2 text-sm text-green-400">{result}</div>}
        {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-white/70 text-sm">
        Contacts list coming soon.
      </div>
    </div>
  );
}

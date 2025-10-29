"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [senderId, setSenderId] = useState("");
  const [provider, setProvider] = useState("stub");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, provider }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage("Saved");
    } catch (e: any) {
      setMessage(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-4">
        <div>
          <label className="block text-sm text-white/80">Sender ID / Business Name</label>
          <input
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder="Your Salon"
          />
        </div>
        <div>
          <label className="block text-sm text-white/80">SMS Provider</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="stub">Stub (no real sends)</option>
            <option value="twilio">Twilio</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={save} disabled={saving} className="px-3 py-2 rounded-md bg-brand-primary hover:bg-brand-primary/90 text-white text-sm disabled:opacity-60">
            {saving ? "Saving..." : "Save"}
          </button>
          {message && <div className="text-sm text-white/70 self-center">{message}</div>}
        </div>
      </div>
    </div>
  );
}

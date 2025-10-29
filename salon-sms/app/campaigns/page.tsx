"use client";
import { useState } from "react";

export default function CampaignsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-md bg-brand-primary hover:bg-brand-primary/90 text-white text-sm"
        >
          Create Campaign
        </button>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-white/70 text-sm">
        No campaigns yet.
      </div>

      {open && <CreateCampaignModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function CreateCampaignModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, messageText: message, scheduledAt }),
      });
      if (!res.ok) throw new Error(await res.text());
      onClose();
    } catch (e: any) {
      setError(e.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-lg border border-white/10 bg-[#121219] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">New SMS Campaign</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-white/80">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Spring Color Promo"
            />
          </div>
          <div>
            <label className="block text-sm text-white/80">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full min-h-[120px] rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Hi {{firstName}}, 10% off color this week! Reply BOOK to schedule."
            />
            <p className="mt-1 text-xs text-white/60">Use merge tags like {{firstName}}.</p>
          </div>
          <div>
            <label className="block text-sm text-white/80">Schedule (optional)</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          {error && (
            <div className="text-sm text-red-400">{error}</div>
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-md border border-white/10 text-sm"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={submit}
              className="px-3 py-2 rounded-md bg-brand-primary hover:bg-brand-primary/90 text-white text-sm disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

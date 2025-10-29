export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Automations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/70">Smart Reminders</div>
          <div className="mt-2 text-white/90 text-sm">24h before appointment</div>
          <button className="mt-3 px-3 py-2 rounded-md border border-white/10 text-sm">Configure</button>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/70">Winback Campaigns</div>
          <div className="mt-2 text-white/90 text-sm">No visit in X days</div>
          <button className="mt-3 px-3 py-2 rounded-md border border-white/10 text-sm">Configure</button>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/70">Rebooking Prompts</div>
          <div className="mt-2 text-white/90 text-sm">4–6 weeks after visit</div>
          <button className="mt-3 px-3 py-2 rounded-md border border-white/10 text-sm">Configure</button>
        </div>
      </div>
    </div>
  );
}

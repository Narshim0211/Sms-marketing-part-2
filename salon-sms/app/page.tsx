export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <div className="text-sm text-white/70">Delivery Rate</div>
          <div className="text-3xl font-bold mt-2">—</div>
        </div>
        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <div className="text-sm text-white/70">Active Campaigns</div>
          <div className="text-3xl font-bold mt-2">—</div>
        </div>
        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <div className="text-sm text-white/70">Estimated ROI</div>
          <div className="text-3xl font-bold mt-2">—</div>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 p-6 bg-white/5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent Campaigns</h2>
          <a href="/campaigns" className="text-brand-accent hover:underline text-sm">View all</a>
        </div>
        <div className="mt-4 text-white/70 text-sm">No data yet.</div>
      </div>
    </div>
  );
}

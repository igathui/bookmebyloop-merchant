export default async function DashboardPage() {
  // For MVP, we'll just show a simple dashboard
  // In production, you'd check authentication here

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-4xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Business Dashboard</h1>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-muted-foreground">
            Dashboard content will be displayed here after successful login and
            business info completion.
          </p>
        </div>
      </div>
    </div>
  );
}

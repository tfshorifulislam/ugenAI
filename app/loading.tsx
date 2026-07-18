export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Hero */}
        <div className="mb-12 flex flex-col items-center">
          <div className="h-12 w-72 rounded-xl bg-white/10" />
          <div className="mt-5 h-5 w-[500px] max-w-full rounded bg-white/5" />
          <div className="mt-2 h-5 w-[380px] max-w-full rounded bg-white/5" />
        </div>

        {/* Search */}
        <div className="mx-auto mb-12 h-14 max-w-2xl rounded-full bg-white/5" />

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="aspect-[4/5] bg-white/10" />

              <div className="space-y-4 p-5">
                <div className="h-4 w-24 rounded bg-white/10" />

                <div className="h-6 w-4/5 rounded bg-white/10" />

                <div className="space-y-2">
                  <div className="h-3 rounded bg-white/5" />
                  <div className="h-3 w-5/6 rounded bg-white/5" />
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div className="h-4 w-20 rounded bg-white/10" />
                  <div className="h-4 w-16 rounded bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
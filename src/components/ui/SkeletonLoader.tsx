export function SkeletonBox({ width, height, className = "" }: { width?: number | string; height: number | string; className?: string }) {
  return (
    <div
      className={`skeleton rounded-lg ${className}`}
      style={{ width: width ?? "100%", height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <SkeletonBox width={46} height={46} className="!rounded-xl" />
        <SkeletonBox width={60} height={24} />
      </div>
      <SkeletonBox width={80} height={28} className="mb-2" />
      <SkeletonBox width={120} height={16} />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <SkeletonBox width={160} height={18} className="mb-2" />
          <SkeletonBox width={120} height={14} />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBox key={i} width={36} height={28} />
          ))}
        </div>
      </div>
      <SkeletonBox height={240} className="!rounded-xl" />
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="skeleton rounded-full shrink-0" style={{ width: 34, height: 34 }} />
      <div className="flex-1">
        <SkeletonBox width="40%" height={14} className="mb-1.5" />
        <SkeletonBox width="60%" height={12} />
      </div>
      <SkeletonBox width={70} height={22} />
      <SkeletonBox width={60} height={22} />
      <SkeletonBox width={80} height={14} />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><SkeletonChart /></div>
        <SkeletonChart />
      </div>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="flex gap-3 p-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <SkeletonBox height={36} className="flex-1" />
          <SkeletonBox width={100} height={36} />
          <SkeletonBox width={100} height={36} />
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {[1, 2, 3, 4, 5].map((i) => <SkeletonTableRow key={i} />)}
        </div>
      </div>
    </div>
  );
}




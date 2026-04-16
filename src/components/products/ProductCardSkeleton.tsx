export default function ProductCardSkeleton() {
  return (
    <div className="bg-graphite border border-white/5 rounded-sm overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-5 w-24 rounded mt-1" />
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function StoreCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full rounded-2xl" />

      {/* Title */}
      <Skeleton className="h-4 w-3/4" />

      {/* Price */}
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

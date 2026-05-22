import { Skeleton } from "@/components/ui/skeleton";

export function ChatHeaderSkeleton() {
  return (
    <div className="flex items-center gap-3 border-b px-4 py-3 bg-white dark:bg-black">
      {/* Avatar skeleton */}
      <Skeleton className="h-11 w-11 rounded-full" />

      <div className="flex flex-col gap-2">
        {/* Name skeleton */}
        <Skeleton className="h-4 w-32" />

        {/* Optional small subtitle skeleton */}
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

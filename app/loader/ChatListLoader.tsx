import { Skeleton } from "@/components/ui/skeleton";

export const ConversationSkeleton = () => (
  <div className="flex items-center gap-3 px-4 py-3">
    <Skeleton className="h-10 w-10 rounded-full" />

    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
  </div>
);

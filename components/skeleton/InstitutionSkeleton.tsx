import { Skeleton } from "@/components/ui/skeleton";

export const InstitutionSkeleton = () => (
    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <Skeleton className="h-8 w-8 rounded" />
        <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />
        </div>
    </div>
)
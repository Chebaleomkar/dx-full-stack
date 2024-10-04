import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
        <Skeleton className="h-10 w-24" />
    </div>
)
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Skeleton } from '../ui/skeleton'

export const StudentFineTableSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full">
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-20" />
                </CardFooter>
            </Card>
        ))}
    </div>
)

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const NoFineFound = () => (
    <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">No Fines Found</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center text-muted-foreground">
                Keep going, stay disciplined! Good habits create a foundation for success.
            </p>
        </CardContent>
    </Card>
)


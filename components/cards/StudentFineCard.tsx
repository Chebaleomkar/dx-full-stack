import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Fine } from "@/types/Fine"
import { CalendarIcon, CreditCardIcon, UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export const StudentFineCard = ({ fine }: { fine: Fine }) => {
    const router = useRouter()
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{fine.reason}</CardTitle>
            </CardHeader>
            <div className="md:flex md:justify-between md:items-center">
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Amount: <strong> ₹{fine.amount} </strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Issued By: <strong>{fine.issuedBy}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>
                            Issued At:{" "}<strong>
                                {new Date(fine.issuedAt).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </strong>
                        </span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push(`/payment/${fine._id}`)}>Pay</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

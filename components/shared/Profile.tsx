import { Card, CardContent } from "@/components/ui/card"
import UserProfileCard from "@/components/cards/UserProfileCard"
import {InstitutionProfileCard} from "@/components/cards/InstitutionProfileCard"
export default function Profile() {
return (
    <Card className="w-full  mx-auto">
      <CardContent className="space-y-6 ">
        <UserProfileCard />
        <InstitutionProfileCard />
      </CardContent>
    </Card>
)};




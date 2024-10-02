import { useState , useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import useUser from "@/hooks/useUser"
import useInstitution from "@/hooks/useInstitution"
import { Institution } from "@/types/Institution"
import { User } from "@/types/User"
import { LogOut, Building2 } from "lucide-react"
import useSyncFines from "@/hooks/useSyncFine"
import { triggerConfetti } from "@/utils/Confetti"

export default function Profile() {
  const { userData, loading: userLoading, error: userError, handleLogout } = useUser()
  const { institutionData, loading: institutionLoading, error: institutionError } = useInstitution()
  const [showConfetti, setShowConfetti] = useState(false)
  useSyncFines();

  useEffect(() => {
    const hasShownConfetti = sessionStorage.getItem("hasShownConfetti")
    if (!hasShownConfetti) {
      sessionStorage.setItem("hasShownConfetti", "true")
      triggerConfetti()
    }
  }, []);
  return (
    <Card className="w-full  mx-auto">
      <CardContent className="space-y-6 ">
        {userLoading ? (
          <ProfileSkeleton />
        ) : userData ? (
          <ProfileCard userData={userData} handleLogout={handleLogout} />
        ) : (
          <p className="text-center text-muted-foreground">Failed to load user data.</p>
        )}

        {institutionLoading ? (
          <InstitutionSkeleton />
        ) : institutionData ? (
          <InstitutionCard institutionData={institutionData} />
        ) : (
          <p className="text-center text-muted-foreground">
            {institutionError || "Failed to load institution data."}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

const ProfileCard = ({ userData, handleLogout }: { userData: User; handleLogout: () => void }) => (
  <div className="flex mt-2 flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={userData?.imageUrl} alt={userData?.name || "User"} />
        <AvatarFallback>{userData?.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-semibold">{userData?.name || "UserName"}</h2>
        <p className="text-muted-foreground">{userData?.email || "user@example.com"}</p>
      </div>
    </div>
    <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto max-sm:hidden">
      <LogOut className="mr-2 h-4 w-4" /> Log Out
    </Button>
  </div>
)

const InstitutionCard = ({ institutionData }: { institutionData: Institution }) => (
  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
    <Building2 className="h-8 w-8 text-primary" />
    <div>
      <h3 className="text-lg font-semibold">Institution</h3>
      <p className="text-muted-foreground">{institutionData?.name}</p>
    </div>
  </div>
)

const ProfileSkeleton = () => (
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

const InstitutionSkeleton = () => (
  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
    <Skeleton className="h-8 w-8 rounded" />
    <div className="space-y-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
)
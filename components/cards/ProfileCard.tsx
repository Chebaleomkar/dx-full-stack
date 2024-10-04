
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import { LogOut } from "lucide-react";

export const ProfileCard = () => {
    const { userData, loading: userLoading, error: userError, handleLogout } = useUser()

    return (<div className="flex mt-2 flex-col sm:flex-row items-center justify-between gap-4">
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
}
"use client"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { User, LogOut, Settings } from "lucide-react";
import useUser from "@/hooks/useUser";
import Loader from "../Loader";

interface Options {
  surname?: boolean;
  name?: boolean;
  nameOnly?: boolean;
}

const UserAvatar = () => {
  
  const { userData, loading: userLoading , error, handleLogout } = useUser();

  if(error){
    return <span>{error}</span>
  }

function getInitials(fullName: string, options: Options = {}): string {
  const { surname = false, name = false, nameOnly = false } = options;

  // Split the full name into an array of words
  const nameParts = fullName?.trim()?.split(" ");

  if (nameParts?.length < 2) {
    throw new Error(
      "Full name must include at least a first name and a surname"
    );
  }

  const firstName = nameParts[0];
  const lastName = nameParts[1];

  if (nameOnly) {
    return firstName?.toLowerCase(); // Return the first name in all caps
  }

  if (surname) {
    return `${firstName[0]?.toUpperCase()} ${lastName}`; // Return first initial + full surname
  }

  if (name) {
    return `${firstName} ${lastName[0]?.toUpperCase()}`; // Return full first name + surname initial
  }

  // Default behavior: return initials
  return firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase(); // Return initials
}
  return (
    <>
  {userData &&(  <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center text-xl underline gap-3 rounded-md px-3 py-2 text-black">
          <Avatar className="h-14 w-14 overflow-hidden rounded-full border-2 border-blue-500">
            <AvatarImage
              src={userData?.imageUrl ? userData?.imageUrl : "/images/logo.jpeg"}
              alt="User Avatar"
              
            />
            <AvatarFallback className="font-extrabold bg-white">
              {getInitials(userData?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-xl font-bold ">
            {userData?.name || "UserName"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-18 w-64 p-4 space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-bold underline underline-offset-2 text-blue-500">
            {getInitials(userData?.name || "userName", { surname: true })}
          </div>
          <div className="text-muted-foreground font-bold">
            <span className="font-normal">Reputation:</span>{" "}
            {userData?.reputation || 0}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground font-bold">
            <span className="font-normal">Streak:</span> {userData?.streak || 0}
          </div>
          <div className="text-muted-foreground font-bold">
            <span className="font-normal">Coins:</span> {userData?.coins || 0}
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <User size={25} />
            Profile
          </Link>
          <Link
            href="/setting"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <Settings size={25} />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
            onClick={handleLogout}
          >
            <LogOut size={25} />
            Logout
          </Link>
        </div>
      </PopoverContent>
    </Popover>)}
    </>
  );
};

export default UserAvatar;

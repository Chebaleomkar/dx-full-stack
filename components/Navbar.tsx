import Link from "next/link";
import NavItems from "./Navbar/NavItems";
import UserAvatar from "./shared/UserAvatar";
import DxIcon from "./Icons/DxIcon";

export const Navbar = () => {
return (
  <header className="bg rounded-sm">
    <div className="w-full py-3 px-4 sm:px-6 lg:px-8  flex justify-between items-center">
      <Link href="/">
        <DxIcon className="h-16" />
      </Link>
        <div className="flex items-center space-x-4  dark:text-black">
          <NavItems />
        </div>
      <div className="block max-sm:hidden">
        <UserAvatar isNameVisible={false} />
      </div>
    </div>
  </header>
)};

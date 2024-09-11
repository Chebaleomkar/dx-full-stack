"use client";
import { Icons } from "@/components/icons"; // Make sure to import Icons correctly
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import DxIcon from "../Icons/DxIcon";
import useDecodeToken from "@/hooks/useDecodeToken";
import dynamic from "next/dynamic";
import { LinkType } from "@/models/Link";
const UserAvatar = dynamic(() => import("@/components/shared/UserAvatar"));



export default function Component({ links }: { links: LinkType[] }) {
  const { role } = useDecodeToken();

  return (
    <div className="w-14 h-10 bg max-sm:block hidden">
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon size={35} />
        </SheetTrigger>
        <SheetContent side="right" className="bg px-4 py-6">
          <div className="flex flex-col items-start gap-6 mt-5">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <DxIcon className="max-sm:h-16" />
            </Link>
            {role && <UserAvatar />}

            <nav className="flex flex-col items-start gap-8 underline-offset-2 text-3xl  text-black">
              {links?.map((link: LinkType, i) => {
                const Icon = Icons[link.icon || "House"];
                if (!Icon) {
                  console.error(
                    `Icon for "${link.icon}" not found in Icons object`
                  );
                  return null;
                }
                return (
                  <Link
                    href={link.link}
                    className="flex items-center gap-2 rounded-md px-3 py-2 font-semibold "
                    prefetch={false}
                    key={i}
                  >
                    <Icon size={35} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <main className="flex-1 p-6" />
    </div>
  );
}

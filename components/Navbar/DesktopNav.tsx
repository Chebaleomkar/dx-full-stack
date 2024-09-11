import type { LinkType } from "@/models/Link";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNav = ({ links }: { links: any }) => {
  const currentPath = usePathname();

  return (
    <div className="flex justify-center items-center w-full h-16 ">
      {/* Flex container to center the nav */}
      <nav className="flex gap-6">
        {links
          ?.filter((l: LinkType) => l.isActive)
          ?.map((link: LinkType, i: number) => (
            <Link
              key={i}
              href={link.link}
              className={`font-bold py-2 px-4 text-xl ${
                currentPath === link.link
                  ? "underline underline-offset-4 dark:decoration-white"
                  : ""
              } hover:underline rounded transition duration-300 ease-in-out`}
            >
              {link.name}
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default DesktopNav;

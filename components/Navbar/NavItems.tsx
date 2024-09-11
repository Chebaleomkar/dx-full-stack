"use client";
import useAuthStore from "@/store/useAuthStore";
import useDecodeToken from "@/hooks/useDecodeToken";
import { authenticatedLinks, notAuthenticatedLinks } from "@/constant";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; 
import DesktopNav from "./DesktopNav";
const MobileNav = dynamic(() => import("./MobileNav"));

const NavItems = () => {
  const { isAuthenticated } = useAuthStore();
  const { role } = useDecodeToken();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);

    const handleResize = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const filteredAuthenticatedLinks = authenticatedLinks.filter(
    (link) => !(role === "Student" && link.name === "X")
  );

  const linksToRender = isAuthenticated
    ? filteredAuthenticatedLinks
    : notAuthenticatedLinks;

  return (
    <>
      {isDesktop ? (
        <DesktopNav links={linksToRender} />
      ) : (
        <MobileNav links={linksToRender} />
      )}
    </>
  );
};

export default NavItems;

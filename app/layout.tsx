"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/Theme-provider";
import { usePathname } from "next/navigation";
import { BASE_URL } from "@/constant";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "DisciplineX",
  description: "DisciplineX - School and College Disciplinary Management",
  icons: "/images/DX.jpg",
};

const protectedRoutes = {
  student: ["/", "/profile", "/betterme"],
  admin: ["/", "/profile", "/shield", "/betterme"],
  headAdmin: [
    "/",
    "/profile",
    "/betterme",
    "/dashboard/user",
    "/dashboard/fines",
    "/dashboard/employee",
  ],
  superAdmin: ["/*"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router: any = useRouter();
  const { isAuthenticated, role } = useAuthStore();
  const {toast} = useToast();

  const isProtectedRoute = (path: string) => {
    if (role === "superAdmin") return true;
    return (
      protectedRoutes[role as keyof typeof protectedRoutes]?.some((route) =>
        path.startsWith(route.replace("*", ""))
      ) ?? false
    );
  };

  const isLoginPage = router.pathname === "/login";

  useEffect(() => {
    if (!isAuthenticated && router.pathname !== "/login") {
      router.push("/login");
    } else if (isAuthenticated && isLoginPage) {
      router.push("/");
    }
  }, [isAuthenticated, router, isLoginPage]);

  //  synchronization of fines
  useEffect(() => {
    const syncData = async () => {
      const storedFines = localStorage.getItem("finesList");
      if (storedFines) {
        try {
          const finesArray = JSON.parse(storedFines);
          if (finesArray.length > 0) {
            for (const fine of finesArray) {
              try {
                await axios.post(
                  `${BASE_URL}/fine/add`,
                  fine
                  // { headers }
                );
                toast({
                  title: `locally saved data Sync with server`,
                  description: `StudentID : ${fine.studentId} | Reason : ${fine.label}`,
                });
              } catch (error) {
                console.error("Error syncing fine:", error);
              }
            }
            localStorage.removeItem("finesList"); 
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Server is busy";
            console.error("Error adding fine:", errorMessage);
          toast({
            title: "Error in taking Action",
            description: errorMessage,
          });
        }
      }
    };

    if (navigator.onLine) {
      syncData();
    }

    const handleOnline = () => {
      if (navigator.onLine) {
        syncData();
      }
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Toaster />
            <Navbar />
            {isProtectedRoute(router.pathname) ? (
              <ProtectedRoute allowedRoles={[role!]}>{children}</ProtectedRoute>
            ) : (
              children
            )}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

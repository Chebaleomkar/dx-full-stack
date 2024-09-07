"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation"; // Added usePathname
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/Theme-provider";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { toast, useToast } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });



const protectedRoutes: Record<string, string[]> = {
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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { isAuthenticated, role } = useAuthStore();
  const { toast } = useToast();

  const isProtectedRoute = (path: string) => {
    if (role === "superAdmin") return true;
    return (
      protectedRoutes[role as keyof typeof protectedRoutes]?.some((route) =>
        path.startsWith(route.replace("*", ""))
      ) ?? false
    );
  };

  const isLoginPage = pathname === "/login"; // Use pathname instead of router.pathname

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    } else if (isAuthenticated && isLoginPage) {
      router.push("/");
    }
  }, [isAuthenticated, pathname]); // Use pathname instead of router.pathname

  // Synchronization of fines
  useEffect(() => {
    const syncData = async () => {
      const storedFines = localStorage.getItem("finesList");
      if (storedFines) {
        try {
          const finesArray = JSON.parse(storedFines); // Assuming `Fine` is defined in your types
          if (finesArray.length > 0) {
            for (const fine of finesArray) {
              try {
                await axios.post(`${BASE_URL}/fine/add`, fine);
                toast({
                  title: `Locally saved data synced with server`,
                  description: `StudentID : ${fine?.studentId} | Reason : ${fine?.reason}`,
                });
              } catch (error) {
                console.error("Error syncing fine:", error);
              }
            }
            localStorage.removeItem("finesList");
            sessionStorage.removeItem("fines");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Server is busy";
          console.error("Error adding fine:", errorMessage);
          toast({
            title: "Error in taking action",
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
            {isProtectedRoute(pathname) ? ( // Use pathname
              <ProtectedRoute allowedRoles={[role]}>{children}</ProtectedRoute>
            ) : (
              children
            )}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

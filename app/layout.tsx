"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/Theme-provider";
import { Navbar } from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Inter } from "next/font/google";
import { BASE_URL } from "@/constant";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


interface RootLayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname:any = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const publicPages = ["/", "/login"];
  
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      if (!publicPages.includes(pathname)) {
        router.push("/login");
      }
    }else if(isAuthenticated){
      router.push('/profile');
    } else if (isAuthenticated &&  pathname === "/login") {
      router.push("/");
    }
  }, [isAuthenticated, router , pathname ]);

   // sync fines to server
  useEffect(() => {
    const syncData = async () => {
      const storedFines = localStorage.getItem("finesList");
      if (storedFines) {
        const finesArray = JSON.parse(storedFines);
        if (finesArray.length > 0) {
          try {
            for (const fine of finesArray) {
              await axios.post(`${BASE_URL}/fine/add`, fine);
              toast({
                title: "Locally saved data synced with server",
                description: `StudentID: ${fine?.studentId} | Reason: ${fine?.reason}`,
              });
            }
            localStorage.removeItem("finesList");
            sessionStorage.removeItem("fines");
          } catch (error:any) {
            toast({
              title: "Error syncing data",
              description: error.response?.data?.message || "Server is busy",
            });
          }
        }
      }
    };

    if (navigator.onLine) {
      syncData();
    }

    window.addEventListener("online", syncData);

    return () => {
      window.removeEventListener("online", syncData);
    };
  }, [toast]);

  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <Toaster />
              <Navbar />
              {children}
            </TooltipProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}

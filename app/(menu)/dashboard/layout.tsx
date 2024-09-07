"use client"
import Header from '@/components/header';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar2';

import type { Metadata } from 'next';

 const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute allowedRoles={["HeadAdmin", "SuperAdmin"]}>
        <div className="flex h-screen ">
          <Sidebar />
          <main className="flex-1  pt-16">{children}</main>
        </div>
      </ProtectedRoute>
    </>
  );
}

import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar2';
import { DOMAIN } from '@/constant';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DisciplineX | Principal Dashboard",
  description:
    "Manage teachers, students, and fine reports effectively. Visualize data through bar graphs, pie charts, and more on the DisciplineX Principal Dashboard.",
  keywords: [
    "Principal Dashboard",
    "discipline management",
    "fine reports",
    "student management",
    "teacher management",
    "graphical representation",
    "DisciplineX",
  ],
  icons :{
    icon :`/images/DX.jpg`
  },
  openGraph: {
    title: "Principal Dashboard | DisciplineX",
    description:
      "Efficiently manage teachers and students while visualizing fine reports with advanced graphical representations on DisciplineX.",
    type: "website",
    url: `${DOMAIN}/dashboard`,
    
    images: [
      {
        url: "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", 
        width: 1200,
        height: 630,
        alt: "Principal Dashboard Preview",
      },
    ],
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Principal Dashboard | DisciplineX",
    description:
      "Manage your institution effectively with DisciplineX. Visualize fine reports and student data through charts and graphs.",
    images: [
      "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", 
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN}/dashboard`,
  },
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

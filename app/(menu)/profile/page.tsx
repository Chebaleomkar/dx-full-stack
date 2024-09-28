import ProtectedRoute from "@/components/ProtectedRoute";
import {Metadata} from 'next';
import { DOMAIN } from "@/constant";
import ProfilePage from "@/components/shared/ProfilePage";

export const metadata: Metadata = {
  title: "DisciplineX | Profile",
  description:
    "View and manage your profile on DisciplineX. Access your account information and customize your settings to enhance your learning experience.",
  keywords: [
    "Profile",
    "student profile",
    "manage account",
    "DisciplineX",
    "user settings",
    "student dashboard",
    "account management",
  ],
  icons :{
    icon :`/images/DX.jpg`
  },
  openGraph: {
    title: "DisciplineX | Profile",
    description:
      "Easily view and manage your profile on DisciplineX, access your account information, and customize your settings for an enhanced experience.",
    type: "website",
    url: `${DOMAIN}/profile`,
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "DisciplineX | Profile",
    description:
      "Access your DisciplineX profile to manage your account and enhance your learning experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN}/profile`, 
  },
};

export default function Profile() {

  return (
    <ProtectedRoute allowedRoles={["Student", "Admin", "HeadAdmin", "SuperAdmin"]}>
      <ProfilePage />
    </ProtectedRoute>
  );
}



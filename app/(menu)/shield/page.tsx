import AddFine from "@/components/forms/AddFine";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DOMAIN } from "@/constant";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DisciplineX | Add Fine",
  description:
    "Add fines for students and manage discipline efficiently with DisciplineX. Empower your institution to maintain order and track behavior with ease.",
  keywords: [
    "Add fine",
    "student discipline",
    "fine management",
    "behavior tracking",
    "DisciplineX",
    "teacher tools",
    "discipline system",
    "student management",
  ],
  openGraph: {
    title: "Add Fine | DisciplineX",
    description:
      "Easily add fines for student misbehavior and ensure discipline in your institution with DisciplineX's advanced tools for teachers.",
    type: "website",
    url: `${DOMAIN}/shield`, 
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Fine | DisciplineX",
    description:
      "Easily add fines for student misbehavior and ensure discipline in your institution with DisciplineX's advanced tools for teachers.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN}/shield`, 
  },
};



const Sheild = () => {

  return (
    <ProtectedRoute allowedRoles={["Admin", "HeadAdmin", "SuperAdmin"]}>
    <AddFine />
    </ProtectedRoute>
  );
};

export default Sheild;

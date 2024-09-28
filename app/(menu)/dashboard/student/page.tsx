import { Breadcrumbs } from "@/components/breadcrumbs";
import { UserClient } from "@/components/tables/user-tables/client";
import { DOMAIN } from "@/constant";
import { Metadata } from "next";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "User", link: "/dashboard/user" },
];

export const metadata: Metadata = {
  title: "DisciplineX | Manage Students",
  description:
    "View the complete list of students enrolled in DisciplineX. Manage student records by adding, updating, or deleting student profiles seamlessly.",
  keywords: [
    "Manage Students",
    "student list",
    "add student",
    "update student",
    "delete student",
    "student management",
    "DisciplineX",
  ],
  icons :{
    icon :`/images/DX.jpg`
  },
  openGraph: {
    title: "DisciplineX | Manage Students",
    description:
      "Easily manage your students with DisciplineX. View all enrolled students and perform actions such as adding, updating, or deleting student records.",
    type: "website",
    url: `${DOMAIN}/dashboard/student`, 
    images: [
      {
        url: "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", 
        width: 1200,
        height: 630,
        alt: "Student Management Preview",
      },
    ],
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manage Students | DisciplineX",
    description:
      "Access and manage your students in DisciplineX. Add, update, or delete student profiles with ease.",
    images: [
      "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", 
    ]
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN}/dashboard/student`, 
  },
};


export default function page() {
  
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient />
      </div>
    </>
  );
}

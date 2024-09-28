import { Breadcrumbs } from '@/components/breadcrumbs';
import { TeacherClient } from '@/components/tables/teacher-table/TeacherClient';
import { DOMAIN } from '@/constant';
import { Metadata } from 'next';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Teachers', link: '/dashboard/teacher' }
];

export const metadata: Metadata = {
  title: "DisciplineX | Manage Teachers",
  description:
    "View the complete list of teachers enrolled in DisciplineX. Manage teacher records by adding, updating, or deleting teacher profiles seamlessly.",
  keywords: [
    "Manage Teachers",
    "teacher list",
    "add teacher",
    "update teacher",
    "delete teacher",
    "teacher management",
    "DisciplineX",
  ],
  icons :{
    icon :`/images/DX.jpg`
  },
  openGraph: {
    title: "DisciplineX | Manage Teachers",
    description:
      "Easily manage your teachers with DisciplineX. View all enrolled teachers and perform actions such as adding, updating, or deleting teacher records.",
    type: "website",
    url: `${DOMAIN}/dashboard/teacher`, 
    images: [
      {
        url: "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75",
        width: 1200,
        height: 630,
        alt: "Teacher Management Preview",
      },
    ],
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manage Teachers | DisciplineX",
    description:
      "Access and manage your teachers in DisciplineX. Add, update, or delete teacher profiles with ease.",
    images: [
      "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", // Replace with actual image URL
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN}/dashboard/teacher`,
  },
};

export default function Page() {

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <TeacherClient />
      </div>
    </>
  );
}

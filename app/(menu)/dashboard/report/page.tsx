import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReportMetric } from "@/components/HeadAdmin/ReportMetric";
import { DOMAIN } from "@/constant";
import { Metadata } from "next";
const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Report", link: "/dashboard/report" },
];
export const metadata: Metadata = {
  title: "DisciplineX | Generate Reports",
  description:
    "Generate detailed reports for the last week, last month, and fortnight in DisciplineX. Easily print and manage your reports to track student and teacher performance.",
  keywords: [
    "Generate Reports",
    "report management",
    "weekly report",
    "monthly report",
    "fortnight report",
    "print reports",
    "DisciplineX",
  ],
  icons :{
    icon :`/images/DX.jpg`
  },
  openGraph: {
    title: "DisciplineX | Generate Reports",
    description:
      "Access comprehensive report generation tools in DisciplineX. Create reports for the last week, last month, and fortnight with printing capabilities.",
    type: "website",
    url: `${DOMAIN}/dashboard/report`,
    images: [
      {
        url: "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", 
        width: 1200,
        height: 630,
        alt: "Report Generation Preview",
      },
    ],
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate Reports | DisciplineX",
    description:
      "Easily generate and print reports for the last week, month, and fortnight in DisciplineX. Track performance and manage data efficiently.",
    images: [
      "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", 
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN}/dashboard/report`, 
  },
};
export default function page() {
return (
  <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
    <Breadcrumbs items={breadcrumbItems} />
    <ReportMetric />
  </div>
)}

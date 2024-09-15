"use client"
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReportMetric } from "@/components/HeadAdmin/ReportMetric";
const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Report", link: "/dashboard/report" },
];

export default function page() {
  
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ReportMetric />
      </div>
    </>
  );
}

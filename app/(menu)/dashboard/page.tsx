
import {Metadata} from 'next';
import FineCardContainer from "@/components/HeadAdmin/FineCardContainer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReasonAmountTracker from '@/components/HeadAdmin/Reason-Amount-tracker'
import { DOMAIN } from "@/constant";

export const metadata: Metadata = {
  title: "DisciplineX | Dashboard ",
  description:
    "View comprehensive statistics on student and teacher counts, total fines, unpaid and paid amounts, and graphical representations of fine data over the last 7 days or 1 month on the DisciplineX dashboard.",
  keywords: [
    "Dashboard",
    "student statistics",
    "teacher statistics",
    "total fines",
    "unpaid fines",
    "paid fines",
    "fine management",
    "bar graph",
    "pie chart",
    "DisciplineX",
  ],
  openGraph: {
    title: "Dashboard | DisciplineX",
    description:
      "Access detailed statistics for students, teachers, and fines. Visualize fine data through bar graphs and pie charts over the past week or month.",
    type: "website",
    url: `${DOMAIN}/dashboard`, 
    images: [
      {
        url: "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75",
        width: 1200,
        height: 630,
        alt: "DisciplineX Dashboard Preview",
      },
    ],
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | DisciplineX",
    description:
      "Manage and visualize student and teacher statistics, total fines, and payment statuses with interactive graphs on the DisciplineX dashboard.",
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

export default function page() {


  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsList>
            <TabsTrigger value="finechart">Fine chart</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <FineCardContainer />
          </TabsContent>
          <TabsContent value="finechart" className="space-y-4">
            <ReasonAmountTracker />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

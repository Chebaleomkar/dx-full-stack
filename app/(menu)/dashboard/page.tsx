import ProtectedRoute from "@/components/ProtectedRoute";
import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { PieGraph } from "@/components/charts/pie-graph";
import FineCardContainer from "@/components/HeadAdmin/FineCardContainer";
import TodayFine from '@/components/HeadAdmin/TodayFine'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReasonAmountTracker from '@/components/HeadAdmin/Reason-Amount-tracker'

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

import StudentFinesTable from "@/components/Student/StudentFinesTable";
import ProtectedRoute from "../ProtectedRoute";
import { ScrollArea } from "../ui/scroll-area";
import Profile from "../shared/Profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FineInformation from "./FineInformation";

const StudentProfile = () => {
  return (
    <ProtectedRoute allowedRoles={["Student"]}>
      <Profile />
      <Tabs className="mt-5" defaultValue="yourFines">
        <TabsList>
          <TabsTrigger value="yourFines">Your Fines</TabsTrigger>
          <TabsTrigger value="fineChart">Fine Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="yourFines">
          <ScrollArea className="h-screen p-4 border mt-5">
            <StudentFinesTable />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="fineChart">
          <FineInformation />
        </TabsContent>
      </Tabs>
    </ProtectedRoute>
  );
};

export default StudentProfile;

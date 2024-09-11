import StudentFinesTable from "@/components/StudentFinesTable";
import ProtectedRoute from "../ProtectedRoute";
import { ScrollArea } from "../ui/scroll-area";
import Profile from "../shared/Profile";
 
const StudentProfile = () => {
  return (
    <ProtectedRoute allowedRoles={["Student"]}>
      <Profile  />
      <ScrollArea className="h-screen p-4 border mt-5">
        {/*student fine table */}
        <StudentFinesTable />
      </ScrollArea>
    </ProtectedRoute>
  );
};

export default StudentProfile;

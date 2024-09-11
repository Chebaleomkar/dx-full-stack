import AddFine from "@/components/forms/AddFine";
import ProtectedRoute from "@/components/ProtectedRoute";


const Sheild = () => {

  return (
    <ProtectedRoute allowedRoles={["Admin", "HeadAdmin", "SuperAdmin"]}>
    <AddFine />
    </ProtectedRoute>
  );
};

export default Sheild;

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import InstitutionForm from "./InstitutionForm";
import UserForm from "./UserForm";
import StudentForm from "./StudentForm";

interface AlertFormProps {
  defaultData: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
  formType: string;
  isAdd? : boolean
}

const AlertForm: React.FC<AlertFormProps> = ({
  defaultData,
  onClose,
  onSubmit,
  formType,
  isAdd,
}) => {
  const handleSubmit = async(data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update </AlertDialogTitle>
          <AlertDialogDescription>Update the details .</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          {formType === "user" && (
            <UserForm
              defaultValues={defaultData}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          )}

          {formType === "institution" && (
            <InstitutionForm
              defaultValues={defaultData}
              onSubmit={handleSubmit}
              isAdd={isAdd}
              onClose={onClose}
            />
          )}

          {formType === "Student" && (
            <StudentForm
              defaultValues={defaultData}
              isAdd={isAdd}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertForm;

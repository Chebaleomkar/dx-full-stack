"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


type CustomAlertProps = {
  label: string;
  title: string;
  description: string;
  body? : React.ReactElement ;
  handleClick: () => void;
  className?:string;
  primaryButtonName?: string;
  secondaryButtonName?: string;
};

 const CustomAlert = ({
  label,
  title,
  body ,
  description,
  handleClick,
  className,
  primaryButtonName = 'continue',
  secondaryButtonName = 'Fine'
}: CustomAlertProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline"  className={className} > {label} </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
           {body && body}
          <AlertDialogFooter>
            <AlertDialogCancel>{secondaryButtonName} </AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer">
              <Button type="button" onClick={handleClick}>
                {primaryButtonName}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomAlert
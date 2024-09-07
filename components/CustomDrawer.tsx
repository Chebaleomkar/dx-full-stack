"use client"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type CustomDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  body?: ReactNode;
  primaryButtonName?: string;
  secondaryButtonName?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const CustomDrawer = ({
  open,
  onOpenChange,
  title,
  description,
  body,
  primaryButtonName = 'Confirm',
  secondaryButtonName = 'Close',
  onPrimaryClick,
  onSecondaryClick,
}: CustomDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription>
            <span className="max-sm:ml-20" >{description}</span>
            {body && <div>{body}</div>}
          </DrawerDescription>
        <DrawerFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onSecondaryClick}
          >
            {secondaryButtonName}
          </Button>
          <Button
            type="button"
            onClick={onPrimaryClick}
          >
            {primaryButtonName}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;

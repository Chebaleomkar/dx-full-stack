import { Icons } from "@/components/icons";

export type LinkType = {
  link: string;
  name: string;
  icon?: keyof typeof Icons;
  isActive:boolean;
};

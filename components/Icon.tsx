import React from "react";
import * as Icons from "lucide-react";
import { CircleUser, LayoutDashboard } from "lucide-react";
import { Shield } from "lucide-react";

const Icon = ({ name, size = 25 , fillColor }:{name : string , size?:number , fillColor?:string}) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <span>
      <IconComponent  />
    </span>
  );
};

export default Icon;

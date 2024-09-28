import React from "react";
import { Button } from "@/components/ui/button";

interface BadgeGridProps {
  BadgeList: { name: string }[];
  handleBadgeClick: (badgeName: string) => void;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ BadgeList, handleBadgeClick }) => {
  return (
    <div className="flex text-xl items-center justify-start gap-1">
      <div className="grid grid-rows-3 grid-flow-col gap-2 overflow-x-auto items-center overflow-y-hidden max-sm:scrollbar-thin md:scrollbar-thumb-gray-400 md:scrollbar-track-slate-200 max-sm:scrollbar-hide p-2">
        {BadgeList.map((badge, i) => (
          <Button
            variant="outline"
            key={i}
            onClick={() => handleBadgeClick(badge.name)}
            className="rounded-[50px]"
          >
            {badge.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BadgeGrid;
import React from 'react';
import { Trophy, Info } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'; // Adjust import paths as needed


interface ReputationBadgeProps {
  label : string;
  icon : string;
  iconColor : string;
  Number : number;
  tooltipText: string;
}

const RewardBadge: React.FC<ReputationBadgeProps> = ({label , icon , iconColor , Number,tooltipText }) => {
  return (
    <div className="gap-1 mt-2 flex items-center justify-center md:justify-start">
      <span className="font-semibold underline">{label}:</span>
      <span className="ml-1">{Number}</span>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <sup className="mb-2">
            <Info size={15}  />
          </sup>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default RewardBadge;

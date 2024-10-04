import { Institution } from "@/types/Institution";
import { Building2 } from "lucide-react";
export const InstitutionCard = ({ institutionData }: { institutionData: Institution }) => (
    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <Building2 className="h-8 w-8 text-primary" />
        <div>
            <h3 className="text-lg font-semibold">Institution</h3>
            <p className="text-muted-foreground">{institutionData?.name}</p>
        </div>
    </div>
)
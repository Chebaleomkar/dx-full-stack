import React from "react";
import useInstitution from "@/hooks/useInstitution";
import { InstitutionSkeleton } from "@/components/skeleton/InstitutionSkeleton";
import { InstitutionCard } from "@/components/cards/InstitutionCard";
export const InstitutionProfileCard = () => {
    const { institutionData, loading: institutionLoading, error: institutionError } = useInstitution();

    return (
        <>
            {institutionLoading ? (
                <InstitutionSkeleton />
            ) : institutionData ? (
                <InstitutionCard institutionData={institutionData} />
            ) : (
                <p className="text-center text-muted-foreground">
                    {institutionError || "Failed to load institution data."}
                </p>
            )}
        </>
    )
};


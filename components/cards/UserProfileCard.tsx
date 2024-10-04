import React, { useEffect } from "react";
import { ProfileSkeleton } from "../skeleton/ProfileSkeleton";
import { ProfileCard } from "./ProfileCard";
import useUser from "@/hooks/useUser";
import useSyncFines from "@/hooks/useSyncFine";
import { triggerConfetti } from "@/utils/Confetti";

const UserProfileCard = () => {
  const { userData, loading: userLoading, error: userError, handleLogout } = useUser();
  useSyncFines();
  useEffect(() => {
    const hasShownConfetti = sessionStorage.getItem("hasShownConfetti")
    if (!hasShownConfetti) {
      sessionStorage.setItem("hasShownConfetti", "true")
      triggerConfetti()
    }
  }, []);

  return (
    <>
      {userLoading ? (
        <ProfileSkeleton />
      ) : userData ? (
        <ProfileCard />
      ) : (
        <p className="text-center text-muted-foreground">
          Failed to load user data.
        </p>
      )}
    </>
  );
};

export default UserProfileCard;

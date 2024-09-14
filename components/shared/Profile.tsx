import { Button } from "../ui/button";
import useUser from "@/hooks/useUser";
import useInstitution from "@/hooks/useInstitution";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { Institution } from "@/types/Institution";
import { User } from "@/types/User";
import { LogOut } from "lucide-react";


const Profile = () => {
  const { userData, loading: userLoading ,error:userError ,handleLogout } = useUser();
  const { institutionData, loading: institutionLoading  , error:institutionError} = useInstitution( );

  return (
    <div className="p-6 mt-3 rounded-3xl shadow-lg border dark:border-white border-white mb-3 dark:bg-gray-800">
      {userData && (
        <ProfileCard userData={userData} handleLogout={handleLogout} />
      ) }

      {institutionData ? (
        <InstitutionCard institutionData={institutionData} />
      ) : (
        <>{institutionError}
          <LoaderIconComponent />
        </>
      )}
    </div>
  );
};

export default Profile;


const LoaderIconComponent = () =>(
  <div className="flex items-center justify-center ">
    <LoadingIcon  className="animate-spin h-20 dark:fill-white" />
  </div>
)

const ProfileCard = ({userData , handleLogout} : {userData : User , handleLogout : ()=>void}) =>(
  <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
            <div className="w-24 h-24">
              <img
                height={100}
                width={100}
                className="rounded-full border-2 border-blue-500"
                src={
                  userData?.imageUrl
                    ? userData?.imageUrl
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                alt="User Image"
              />
            </div>
            <div className="ml-0 sm:ml-4 mt-4 sm:mt-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1">
                {userData?.name || "UserName"}
              </h2>
              <p className="text-sm sm:text-base">
                {userData?.email || "user@gmail.com"}
              </p>
            </div>
          </div>
        </div>
)

const InstitutionCard = ({institutionData} : {institutionData : Institution}) =>(
  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
  <div>
    <h3 className="text-lg sm:text-xl font-semibold mb-2">
      Institution Details
    </h3>
    <p className="text-sm sm:text-base">
      <span className="font-semibold">{institutionData?.name}</span>
    </p>
  </div>
</div>
)
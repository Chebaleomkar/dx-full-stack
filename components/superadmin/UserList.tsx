import React, { useEffect, useState } from "react";
import useGetData from "@/hooks/useGetData";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Loader from "../Loader";
import AlertInstitutionForm from "../forms/AlertForm";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getToken } from "@/utils/getToken";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  institution: string;
  createdAt: string;
  imageUrl?: string;
  points: number;
  reputation: number;
}

const UserList: React.FC = () => {
    const [data, setData] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    useEffect(() => {
      const fetchData = async () => {
        const cachedData = sessionStorage.getItem("userData");

        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
        } else {
          try {
            const response = await axios.get(`${BASE_URL}/user`, { headers });
            const fetchedData = response.data;
            setData(fetchedData);
            sessionStorage.setItem("userData", JSON.stringify(fetchedData));
          } catch (error) {
            setError("Failed to fetch user data");
          } finally {
            setLoading(false);
          }
        }
      };

      fetchData();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    const handleUpdateClick = (user: User) => {
      setSelectedUser(user);
    };

    const handleUpdateSubmit = async (updatedUser: User) => {
      try {
        await axios.put(`${BASE_URL}/user/${selectedUser?._id}`, updatedUser, {
          headers,
        });

        toast({
          title: "User updated successfully",
          description: "The user details have been updated.",
        });

        setSelectedUser(null);
        sessionStorage.removeItem("userData"); // Remove cached data to refresh
        router.refresh();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Server is not accepting the request";
        toast({
          title: "Error in updating User",
          description: errorMessage,
        });
      }
    };

    const handleDelete = async (user: User) => {
      try {
        await axios.delete(`${BASE_URL}/user/${user._id}`, { headers });

        toast({
          title: "User deleted successfully",
          description: "The user has been deleted.",
        });

        sessionStorage.removeItem("userData"); // Remove cached data to refresh
        router.refresh();
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Failed to delete user",
          description: "Please try again later",
        });
      }
    };

  return (
    <div className="overflow-x-auto border dark:border-white border-black rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Points
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Reputation
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data?.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {user.points}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {user.reputation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Ellipsis className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleUpdateClick(user)}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(user)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <AlertInstitutionForm
          defaultData={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSubmit={handleUpdateSubmit}
          formType="user"
        />
      )}
    </div>
  );
};

export default UserList;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Loader from "../Loader";
import AlertForm from "../forms/AlertForm";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/getToken";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Institution {
  _id: string;
  name: string;
  address?: string;
  website?: string;
  imageUrl?: string;
  createdAt: string;
}

const InstitutionList: React.FC = () => {
  const [data, setData] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedData = sessionStorage.getItem("institutionsList");

      if (storedData) {
        setData(JSON.parse(storedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(`${BASE_URL}/institution`, {
            headers,
          });
          const fetchedData = response.data;
          setData(fetchedData);
          sessionStorage.setItem(
            "institutionsList",
            JSON.stringify(fetchedData)
          );
        } catch (error) {
          setError("Failed to fetch institution data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []); // Only runs on mount and unmount

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  const handleUpdateClick = (institution: Institution) => {
    setSelectedInstitution(institution);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setSelectedInstitution(null);
  };

  const handleFormSubmit = async (institutionData: Institution) => {
    if (isAdding) {
      try {
        const response = await axios.post(
          `${BASE_URL}/institution`,
          institutionData,
          { headers }
        );

        if (response.status >= 200 && response.status < 300) {
          toast({
            title: "Institution added successfully",
            description: "A new institution has been added.",
          });

          setData((prevData) => [...prevData, response.data]);
        }

        setIsAdding(false);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to add institution.";
        toast({
          title: "Error adding Institution",
          description: errorMessage,
        });
      }
    } else if (selectedInstitution) {
      try {
        const res = await axios.put(
          `${BASE_URL}/institution/${selectedInstitution._id}`,
          institutionData,
          { headers }
        );

        if (res.status >= 200 && res.status < 300) {
          toast({
            title: "Institution updated successfully",
            description: "The institution details have been updated.",
          });
          setData((prevData) =>
            prevData.map((institution) =>
              institution._id === selectedInstitution._id
                ? institutionData
                : institution
            )
          );
        }

        setSelectedInstitution(null);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Server is not accepting the request";
        toast({
          title: "Error in updating Institution",
          description: errorMessage,
        });
      }
    }
    router.refresh(); // Refreshes the page
  };

  const handleViewDetails = (institution: Institution) => {
    console.log("View Details", institution);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleAddClick}>Add New Institution</Button>
      </div>
      <div className="overflow-x-auto border dark:border-white border-black rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Website
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
            {data.map((institution) => (
              <tr
                key={institution._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {institution.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {institution.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <a
                    href={institution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {institution.website}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(institution.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Ellipsis className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleUpdateClick(institution)}
                      >
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(institution)}
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(selectedInstitution || isAdding) && (
        <AlertForm
          defaultData={selectedInstitution || {}}
          isAdd={!selectedInstitution}
          onClose={() => {
            setSelectedInstitution(null);
            setIsAdding(false);
          }}
          onSubmit={handleFormSubmit}
          formType="institution"
        />
      )}
    </div>
  );
};

export default InstitutionList;

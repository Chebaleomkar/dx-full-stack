
// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { BASE_URL } from "@/constant";
// import { getToken } from "@/utils/getToken";
// import useAuthStore from "@/store/useAuthStore";
// import useDecodeToken from "@/hooks/useDecodeToken";
// // Create UserContext
// const UserContext = createContext();

// // Create UserProvider component
// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [institutionData, setInstitutionData] =useState(null);
//   const [loading, setLoading] = useState(true);

//   const { userId, role } = useDecodeToken();
//   const { logout } = useAuthStore();
//   const router = useRouter();

//   // Fetch user data and institution data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         const token = getToken();
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};

//         // Check if user data is already cached
//         const cachedUserData = localStorage.getItem("userData");
//         if (cachedUserData) {
//           const parsedUserData = JSON.parse(cachedUserData);
//           setUserData(parsedUserData);

//           // Fetch institution data if user data has institution id
//           if (parsedUserData.institution) {
//             await fetchInstitutionData(parsedUserData.institution);
//           }
//         }

//         // Fetch user data if not cached
//         if (!cachedUserData && userId) {
//           const userResponse = await axios.get(
//             `${BASE_URL}/${role === "Student" ? "student" : "user"}/${userId}`,
//             // { headers }
//           );
//           const fetchedUserData = userResponse.data;
//           setUserData(fetchedUserData);
//           localStorage.setItem("userData", JSON.stringify(fetchedUserData));

//           // Fetch institution data if user has institution id
//           if (fetchedUserData.institution) {
//             await fetchInstitutionData(fetchedUserData.institution);
//           }
//         }
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch institution data
//     const fetchInstitutionData = async (institutionId) => {
//       try {
//         const institutionResponse = await axios.get(
//           `${BASE_URL}/institution/${institutionId}`
//         );
//         const fetchedInstitutionData = institutionResponse.data;
//         setInstitutionData(fetchedInstitutionData);
//         localStorage.setItem(
//           "institutionData",
//           JSON.stringify(fetchedInstitutionData)
//         );
//       } catch (error) {
//         console.log("Error fetching institution data:", error.message);
//       }
//     };

//     fetchUserData();
//   }, [userId, role]);

//   const handleLogout = () => {
//     localStorage.removeItem("dxToken");
//     localStorage.removeItem("userData");
//     localStorage.removeItem("institutionData");
//     sessionStorage.clear();
//     logout();
//     router.push("/login");
//     location.reload();
//   };

//   return (
//     <UserContext.Provider
//       value={{ userData, institutionData, loading, handleLogout }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use the UserContext
// export const useUser = () => useContext(UserContext);

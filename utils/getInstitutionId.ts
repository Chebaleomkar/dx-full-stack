"use client"
export const getInstitutionId = () => {
  // Retrieve the institution data from localStorage
  const institutionData = localStorage.getItem("institutionData");

  // Parse the data from JSON format to a JavaScript object
  if (institutionData) {
    const institution = JSON.parse(institutionData);

    // Return the _id value
    return institution._id;
  }

  // Return null or undefined if no institution data is found
  return null;
};

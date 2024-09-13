"use client"
export const getInstitutionId = () => {
  const institutionData = localStorage.getItem("institutionData");
  if (institutionData) {
    const institution = JSON.parse(institutionData);
    return institution._id;
  }
  return null;
};

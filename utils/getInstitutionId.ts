"use client"
export const getInstitutionId = () => {
  const institutionData = sessionStorage.getItem("institutionData");
  if (institutionData) {
    const institution = JSON.parse(institutionData);
    return institution._id;
  }
  return null;
};


export const isAuthenticated = () => {
  return !!sessionStorage.getItem("dxToken");
};


export const getToken = () =>{
  return typeof window !== "undefined" ? localStorage.getItem("dxToken") : null;
}
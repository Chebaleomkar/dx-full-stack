
export const getToken = () =>{
  return typeof window !== "undefined" ? sessionStorage.getItem("dxToken") : null;
}
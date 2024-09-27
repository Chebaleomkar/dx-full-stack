import { decryptData } from "./encrypt-decrypt";

export const getToken = () =>{
  if (typeof window !== "undefined") {
    const encryptedToken = sessionStorage.getItem("dxToken");
    if (encryptedToken) {
      const token = decryptData(encryptedToken);
      return token; 
    }
  }
  return null;
}
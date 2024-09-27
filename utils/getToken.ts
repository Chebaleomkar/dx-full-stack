import { decryptData } from "./encrypt-decrypt";

export const getToken = () =>{
  if (typeof window !== "undefined") {
    const encryptedToken = sessionStorage.getItem("dxToken");
    if (encryptedToken) {
      const decryptedToken = decryptData(encryptedToken);
      return decryptedToken; 
    }
  }
  return null;
}
import { encryptData } from '@/utils/encrypt-decrypt';

export const storeToken = (token: string | null): void => {
    if (!token) {
        console.error('No token provided to store.');
        return;
    }

    const encryptToken = encryptData(token);
    sessionStorage.setItem("dxToken", encryptToken);
};

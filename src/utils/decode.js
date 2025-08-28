import { jwtDecode } from "jwt-decode";

export const getIdFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); 
    if (!decoded?.sub) return null;

    const id = Number(decoded.sub);
    return Number.isInteger(id) ? id : null;
  } catch (e) {
    console.error("Invalid token decode:", e);
    return null;
  }
};

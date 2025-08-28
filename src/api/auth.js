import API, { setAuthHeader } from "./api";

export const login = async (username, password) => {
  try {
    const res = await API.post("/auth/login", { username, password });

    const token = res.data?.access_token;
    console.log("login response", res.data);

    if (!token) {
      console.error("Login: no access token in response", res.data);
      throw new Error("No access token returned from server");
    }

    localStorage.setItem("access_token", token);
    setAuthHeader(token);
    return res.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const { data } = await API.post("/auth/register", {
      username,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log("Register failed", error.response?.data);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { data } = await API.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("access_token");
    delete API.defaults.headers.common["Authorization"];
    return data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export const verifyLogin = async () => {
  try {
    const token = localStorage.getItem("access_token");
   console.log("verifyLogin token:", token);
    if (token) setAuthHeader(token);
    else console.warn("No token in localStorage before verifyLogin");


    const { data } = await API.get("/auth/me", { withCredentials: true });
     console.log("/auth/me success", data);
    return data;
  } catch (error) {
    console.error("verifyLogin failed", error.response?.status, error.response?.data || error.message);
    throw error;
  }
};

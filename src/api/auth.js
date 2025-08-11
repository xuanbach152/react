import API from "./api";

export const login = async (username, password) => {
  try {
    const { data } = await API.post(
      "/auth/login",
      { username, password },
      { withCredentials: true }
    );

    const token = data.access_token;

    API.defaults.headers["Authorization"] = `Bearer ${token}`;

    localStorage.setItem("access_token", token);

    return data;
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
    delete API.defaults.headers["Authorization"];
    return data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export const verifyLogin = async () => {
  try {
    const { data } = await API.get("/auth/me", { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Failed", error);
    throw error;
  }
};

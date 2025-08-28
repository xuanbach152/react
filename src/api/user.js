import API from "./api.js";

export const getAllUsers = async () => {
  try {
    const response = await API.get("/user/");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
  
    const response = await API.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateUser = async (id, user) => {
  try {
    const response = await API.put(`/user/${id}`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


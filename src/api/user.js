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
    const updateData = {};

    if (user.newname) updateData.username = user.newname;
    if (user.newemail) updateData.email = user.newemail;
    if (user.password) updateData.password = user.password;

    const response = await API.put(`/user/${id}`, updateData);
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

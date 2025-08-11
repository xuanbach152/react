import API from "./api.js"
const API_URL = "http://localhost:8000";

export const getAllProducts = async () => {
  try {
    const response = await API.get(`/product/`);
    response.data.forEach((product) => {
      product.image = `${API_URL}/image/product/${product.image}`;
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await API.get(`/product/${id}`);
      const product = response.data;
    if (product.image) {
      product.image = `${API_URL}/image/product/${product.image}`;
    }
    return product;
  } catch (error) {
    console.log("Error fetching : ", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await API.post(`/product/`, product
    );
    return response.data;
  } catch (error) {
    console.log("Create product failed: ", error);
    throw error;
  }
};

export const updateProduct = async () => {};

export const deleteProduct = async () => {};

export const uploadImage = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await API.post(
      `/product/upload-image/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Upload Failed", error);
    throw error;
  }
};

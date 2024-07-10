import axios from "axios";

const API = axios.create({
  baseURL: "https://fooddelivery-mern.onrender.com/api/",
});

// Auth
export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);

// Products
export const getAllProducts = async (filter) =>
  await API.get(`/food?${filter}`, filter);

export const getProductDetails = async (id) => await API.get(`/food/${id}`);

// Cart
export const getCart = async (token) =>
  await API.get(`/user/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromCart = async (token, data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Favorites
export const getFavourite = async (token) =>
  await API.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToFavourite = async (token, data) =>
  await API.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromFavourite = async (token, data) =>
  await API.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Orders
export const placeOrder = async (token, data) =>
  await API.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await API.get(`/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Payment
// Payment processing with Razorpay
export const createPaymentOrder = async (amount) => {
  try {
    const response = await API.post('/checkout', { amount });
    return response.data;
  } catch (error) {
    console.error('Error during payment order creation:', error);
    throw error; // Rethrow the error for higher-level handling
  }
}

import axios from "axios";

const API_URL = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (credentials) =>
  axios.post(`${API_URL}/login`, credentials);
export const register = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const getRenginiai = () => axios.get(`${API_URL}/renginiai`);
export const createRenginys = (data) =>
  axios.post(`${API_URL}/renginiai`, data);
export const updateRenginys = (id, data) =>
  axios.put(`${API_URL}/renginiai/${id}`, data);
export const deleteRenginys = (id) =>
  axios.delete(`${API_URL}/renginiai/${id}`);
export const getKategorijos = () => axios.get(`${API_URL}/kategorijos`);
export const createKategorija = (data) =>
  axios.post(`${API_URL}/kategorijos`, data);
export const updateKategorija = (id, data) =>
  axios.put(`${API_URL}/kategorijos/${id}`, data);
export const deleteKategorija = (id) =>
  axios.delete(`${API_URL}/kategorijos/${id}`);
export const createIvertinimas = (data) =>
  axios.post(`${API_URL}/ivertinimai`, data);
export const getIvertinimas = (renginysId) =>
  axios.get(`${API_URL}/renginiai/${renginysId}/ivertinimai`);

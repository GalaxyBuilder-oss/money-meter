import axios from "axios";
import Cookies from "js-cookie";
import { CategoryDto, LoginData, TransactionDto, UserDto } from "./types";

const LINK = import.meta.env.VITE_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: LINK,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token") as string;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
const funcLogin = async (req: LoginData) => {
  const res = await axiosInstance.post("/auth/login", req);
  return res;
};

const funcRegister = async (req: UserDto) => {
  const res = await axiosInstance.post("/auth/register", req);
  return res;
};

const funcUpdateUser = async (id: string, req: UserDto) => {
  const res = await axiosInstance.put(`/auth/update/${id}`, req);
  return res;
};

export const funcGetUserByEmail = async (hashEmail: string) => {
  const res = await axiosInstance.get(`/auth/get-by-email?email=${hashEmail}`);
  return res;
};

export const apiAuth = {
  login: funcLogin,
  register: funcRegister,
  get: funcGetUserByEmail,
  updateUser: funcUpdateUser,
};

// Category
const funcGetByEmailCategory = async (hashEmail: string) => {
  const res = await axiosInstance.get(`/category/by-email?email=${hashEmail}`);
  return res;
};

const funcAddCategory = async (req: CategoryDto) => {
  const res = await axiosInstance.post("/category", req);
  return res;
};

const funcUpdateCategory = async (id: number, req: CategoryDto) => {
  const res = await axiosInstance.put(`/category/${id}`, req);
  return res;
};

const funcDeleteCategory = async (id: number) => {
  const res = await axiosInstance.delete(`/category/${id}`);
  return res;
};

export const apiCategory = {
  getByEmail: funcGetByEmailCategory,
  add: funcAddCategory,
  update: funcUpdateCategory,
  delete: funcDeleteCategory,
};

// Transaction
const funcGetByEmailTransaction = async (hashEmail: string) => {
  const res = await axiosInstance.get(`/transaction/by-email?email=${hashEmail}`);
  return res;
};

const funcAddTransaction = async (req: TransactionDto) => {
  const res = await axiosInstance.post("/transaction", req);
  return res;
};

const funcUpdateTransaction = async (id: number, req: UserDto) => {
  const res = await axiosInstance.put(`/transaction/${id}`, req);
  return res;
};

const funcDeleteTransaction = async (id: number) => {
  const res = await axiosInstance.delete(`/transaction/${id}`);
  return res;
};

export const apiTransaction = {
  getByEmail: funcGetByEmailTransaction,
  add: funcAddTransaction,
  update: funcUpdateTransaction,
  delete: funcDeleteTransaction,
};

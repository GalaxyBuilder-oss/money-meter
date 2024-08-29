import { LoginData } from "./types";

const LINK = import.meta.env.VITE_APP_BACKEND_URL;

export const funcLogin = async (req: LoginData) => {
  const res = await fetch(LINK + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  return res;
};

export const api = {
  login: funcLogin,
}

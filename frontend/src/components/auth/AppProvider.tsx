import { apiAuth, apiCategory, apiTransaction } from "@/api";
import { Category, Transaction, User } from "@/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export interface AppContextType {
  hashEmail: string | null;
  user: User | undefined;
  handleLogin: (value: string) => void;
  handleLogout: () => void;
  formatter: Intl.NumberFormat;
  userData: () => void;
  categories?: Category[];
  fetchCategories: () => void;
  transactions?: Transaction[];
  fetchTransactions: () => void;
  navigate: NavigateFunction;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    undefined
  );
  const hashEmail = Cookies.get("email") as string;
  const expireDate: Date = new Date();
  const navigate = useNavigate()

  const handleLogin = async (token: string) => {
    const decodedUser = jwtDecode(token);
    expireDate.setDate(expireDate.getDate() + 1);
    Cookies.set("email", decodedUser.sub as string, { expires: expireDate });
    Cookies.set("token", token, { expires: expireDate });
    navigate(0)
  };

  const handleLogout = () => {
    // alert("Berhasil logout");
    Cookies.remove("email");
    Cookies.remove("token");
    setUser({} as User);
  };

  const userData = async () => {
    const res = await apiAuth.get(Cookies.get("email") as string);
    setUser(res.data.data as User);
  };

  useEffect(() => {
    userData();
  });

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const fetchCategories = useCallback(async () => {
    await apiCategory.getByEmail(Cookies.get("email") as string).then((res) => {
      setCategories(res.data.data);
    });
  }, [setCategories]);

  const fetchTransactions = useCallback(async () => {
    await apiTransaction
      .getByEmail(Cookies.get("email") as string)
      .then((res) => {
        setTransactions(res.data.data);
      });
  }, [setTransactions]);

  return (
    <AppContext.Provider
      value={{
        hashEmail,
        handleLogin,
        handleLogout,
        user,
        formatter,
        userData,
        categories,
        fetchCategories,
        transactions,
        fetchTransactions,
        navigate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useState } from "react";
import Cookies from "universal-cookie";

interface AppProviderType {
  user: User | null;
  handleLogin: (value?: string) => void;
  handleLogout: () => void;
};

export const AppContext = createContext<AppProviderType | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = new Cookies();
  const expireDate: Date = new Date();

  const handleLogin = (token?: string) => {
    const decodedUser = jwtDecode(token as string);
    expireDate.setHours(1);
    cookies.set("email", decodedUser.aud as string, { expires: expireDate });
    cookies.set("token", token as string, { expires: expireDate });
    setUser(decodedUser as User);
  };

  const handleLogout = () => {
    cookies.remove("email");
    cookies.remove("token");
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

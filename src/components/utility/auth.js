import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState("");
  const nav=useNavigate();
  const login = (username, password, jwt) => {
    setUsername(username);
    setPassword(password);
    setJwt(jwt);
  };

  const logout = () => {
    setUsername(null);
    setPassword(null);
    setJwt(null);
    nav('/login')
  };

  return (
    <AuthContext.Provider value={{ jwt, username, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

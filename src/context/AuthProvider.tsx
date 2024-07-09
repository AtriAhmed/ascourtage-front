import React, { useState, useContext, useEffect, ReactNode, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: undefined as any,
  setUser: (state: any) => state,
  getUserStatus: () => { },
  userLoading: true,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [userLoading, setLoading] = useState(true);

  async function getUserStatus() {
    try {
      const res = await axios.get("api/user/status");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getUserStatus, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}

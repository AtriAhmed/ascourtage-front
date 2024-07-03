/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect, ReactNode, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({ user: undefined, setUser: (state: any) => state, getUserStatus: () => { } });

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState();

  async function getUserStatus() {
    try {
      const res = await axios.get("api/user/status");
      setUser(res.data);
      return res;
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    getUserStatus();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, getUserStatus }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}

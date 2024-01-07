import { createContext, useEffect, useState } from "react";
import axios from "axios";

const initialUserValues = {
  id: null,
  username: "",
  email: "",
  userRole: [],
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserValues);
  const [auth, setAuth] = useState(null);

  // Try to log on PageLoad
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseUser = await axios.get("http://localhost:3000/api/auth", {
          withCredentials: true,
        });
        if (responseUser.status !== 200) {
          throw responseUser;
        }
        // console.log(responseUser);
        setUser(responseUser.data);
        setAuth(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth) {
      console.log("Existe");
    } else {
      // console.log("No existe");
      fetchUser();
    }
    // console.log(user);
  }, [auth]);

  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth",
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      const responseUser = await axios.get("http://localhost:3000/api/auth", {
        withCredentials: true,
      });

      setUser(responseUser.data);
      setAuth(true);
      return response;
    } catch (error) {
      return error;
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        null,
        { withCredentials: true }
      );
      if (response.status !== 200) throw response;
      setUser(initialUserValues);
      setAuth(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const data = { user, auth, loginUser, logoutUser };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

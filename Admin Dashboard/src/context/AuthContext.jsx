import { createContext, useEffect, useReducer } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const INITIAL_STATE = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        admin: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      const token = action.payload.token;
      const tokenExpiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 24); 

      Cookies.set('access_admin_token', token, { expires: tokenExpiration });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return {
        admin: action.payload.admin,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        admin: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        admin: null,
        loading: false,
        error: null,
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        admin: {
          ...state.admin,
          token: action.payload,
        },
      };
    case "REGISTER":
      return {
        admin: action.payload.admin,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(state.admin));
    Cookies.set("admin", JSON.stringify(state.admin));
  }, [state.admin]);

  const refreshToken = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin"));
      const res = await axios.post("http://localhost:8800/auth/refresh-token", {
        adminId: admin._id, 
      });
    
      const { token, admin: refreshedadmin  } = res.data;
      localStorage.setItem("admin", JSON.stringify(refreshedadmin));
      Cookies.set("access_admin_token", JSON.stringify(token));
      
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, admin: refreshedadmin } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin: state.admin,
        loading: state.loading,
        error: state.error,
        dispatch: dispatch,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

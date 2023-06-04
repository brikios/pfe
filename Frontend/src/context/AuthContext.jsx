import { createContext, useEffect, useReducer } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      const token = action.payload.token;
      
      Cookies.set('access_token', action.payload.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return {
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
      case "REFRESH_TOKEN":
        return {
          ...state,
          user: {
            ...state.user,
            token: action.payload,
          },
        };
      default:
        return state;
    }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(state.user))
    Cookies.set("user", JSON.stringify(state.user));
  }, [state.user]);
  const refreshToken = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("http://localhost:8800/auth/refresh-token", {
        userId: user._id, 
      });
    
      const { token, user: refreshedUser  } = res.data;
      localStorage.setItem("user",JSON.stringify(refreshedUser))
      Cookies.set("access_token", JSON.stringify(token));
      
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, user:refreshedUser } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
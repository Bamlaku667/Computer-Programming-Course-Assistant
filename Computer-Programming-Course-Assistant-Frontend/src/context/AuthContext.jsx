import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState('')
  // const [token, setToken] = useState('')

  const [state, dispatch] = useReducer(authReducer, { user: null });
  //   const login = (data) => {
  //     setUser(data.user);
  //     setToken(data.token);
  //   };
  //   const logout = () => {
  //     setUser(null);
  //     setToken(null);
  //   };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);
  console.log("state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

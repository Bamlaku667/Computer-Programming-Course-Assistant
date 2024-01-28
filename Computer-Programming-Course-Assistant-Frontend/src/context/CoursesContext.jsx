import { createContext, useReducer } from "react";

export const CoursesContext = createContext(null);

const coursesReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return {
        courses: action.payload,
      };
    default:
      return state;
  }
};

export const CoursesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coursesReducer, { courses: null });

  console.log("courses context", state);
  return (
    <CoursesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CoursesContext.Provider>
  );
};

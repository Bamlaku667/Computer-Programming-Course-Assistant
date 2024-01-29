import { useContext } from "react";
import { CoursesContext } from "../context/CoursesContext";

export const useCoursesContext = () => {
  const context = useContext(CoursesContext);
  if (context) {
    return context;
  }

  throw Error("context not available ");
};

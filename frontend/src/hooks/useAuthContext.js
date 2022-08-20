import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error("AuthContext not defined ")
  }

  return context

}
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

 export function useMe() {
    const { user } = useContext(AuthContext)
    return user
}

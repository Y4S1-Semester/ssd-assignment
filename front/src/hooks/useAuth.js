import { useContext } from "react";
import {AuthContext} from "../context/auth.context";

export const useAuth = () => {
    const { currentUser } = useContext(AuthContext);

    // Check if a user is logged in by checking the `currentUser`
    return { isAuthenticated: !!currentUser };
};

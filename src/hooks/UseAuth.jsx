import { useContext } from "react";
import { AuthContext } from "../Auth/Provider/AuthProvider";

const usseAuth = () => {

        const auth = useContext(AuthContext);
        return auth;
}

export default usseAuth;
import { Navigate, useLocation } from "react-router-dom";
import usseAuth from "../../hooks/UseAuth";
import useAdmin from "../../hooks/useAdmin";
import { Watch } from "react-loader-spinner";


const AdminRoute = ({ children }) => {
    const { user, loading } = usseAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Watch
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
        }}
        wrapperClassName=""
        visible={true}
    />
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;
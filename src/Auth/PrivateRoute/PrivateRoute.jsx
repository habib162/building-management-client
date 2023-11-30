import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import usseAuth from '../../hooks/UseAuth';
import { Watch } from 'react-loader-spinner';

const PrivateRoute = ({children}) =>{
    const {user,loading} = usseAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div>
               <Watch
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
            </div>
        )
    }
    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>

}

export default PrivateRoute;
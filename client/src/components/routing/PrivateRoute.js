import React, {useContext} from 'react';
import { Navigate, Outlet} from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function PrivateRoute({component: Component, ...rest}){
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;
    //let navigate = useNavigate();
    return(
            !isAuthenticated && !loading? <Navigate to="/login" />:<Outlet />
    );
}

export default PrivateRoute;

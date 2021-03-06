import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
//   const isAuth = useSelector((state) => state.authReducer.isAuth);

//   const isLoading = useSelector((state) => state.authReducer.isLoading);
// if (isLoading) {
//     return <h1>Loading...</h1>;
//   }
  // we dont need to wait for loading cause we are blocking the components rendring in the app
  //waiting for the loading
  const token =localStorage.getItem('token')
  if (!token) {
    return <Redirect to="/login" />;
  } else return <Route path={path} component={Component} {...rest} />;
};

export default PrivateRoute;
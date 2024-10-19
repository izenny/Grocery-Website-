import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const CheckAuth = ({ user, isAuthenticated, children }) => {
  const location = useLocation();
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/login"} />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/home"} />;
    } else {
      return <Navigate to={"/user/home"} />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/unauth-page"} />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("user")
  ) {
    return <Navigate to={"/admin/home"} />;
  }
  // if (
  //   isAuthenticated &&
  //   user?.role === "admin" &&
  //   location.pathname.includes("admin")
  // ) {
  //   return <Navigate to={location.pathname}/>
  // }

  return children ? children : <Outlet />;
};

export default CheckAuth;

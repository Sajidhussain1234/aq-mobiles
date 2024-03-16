// This component ensure that user is login or not
import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
    const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace={true}> </Navigate>; //replace={true} clear history
  }
  return children;
};

export default Protected;

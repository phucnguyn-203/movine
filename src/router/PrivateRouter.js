/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouter = ({ children }) => {
    const currentUser = useSelector((state) => state.user.userInfo);

    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRouter;

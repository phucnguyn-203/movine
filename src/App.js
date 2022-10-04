/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { publicRoutes, privateRoutes } from './router';
import { loggedIn, loggedOut } from './features/user/userSlice';
import { authenticate } from './firebase';
import Loading from './components/loading';
import { DefaultLayout } from './components/layout';
import PrivateRoutes from './router/PrivateRouter';

const App = () => {
    const [isloading, setIsloading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsub = onAuthStateChanged(authenticate, (user) => {
            if (user) {
                console.log(user);
                dispatch(
                    loggedIn({
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        uid: user.uid,
                    }),
                );
                setIsloading(false);
            } else {
                setIsloading(false);
                dispatch(loggedOut());
            }
        });
        return () => unsub();
    }, []);

    return (
        <>
            {isloading ? (
                <Loading />
            ) : (
                <Routes>
                    {publicRoutes.map(({ path, element, layout }) => {
                        let Layout = layout || DefaultLayout;
                        if (layout) {
                            Layout = layout;
                        } else if (layout === null) {
                            Layout = Fragment;
                        }
                        const Page = element;
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map(({ path, element, layout }) => {
                        let Layout = layout || DefaultLayout;
                        if (layout) {
                            Layout = layout;
                        } else if (layout === null) {
                            Layout = Fragment;
                        }
                        const Page = element;
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <PrivateRoutes>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </PrivateRoutes>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            )}
        </>
    );
};

export default App;

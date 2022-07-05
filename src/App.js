/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loggedIn, loggedOut } from './features/user/userSlice';
import { authenticate } from './firebase';
import Router from './router';
import Loading from './components/loading';

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

    return <div className="App">{isloading ? <Loading /> : <Router />}</div>;
};

export default App;

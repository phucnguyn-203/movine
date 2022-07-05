import React from 'react';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signInWithProvider } from '../../firebase';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './login.scss';

const Login = () => {
    useDocumentTitle('Login');
    const navigate = useNavigate();

    const loginWithFacebook = () => {
        const facebookProvider = new FacebookAuthProvider();
        signInWithProvider(facebookProvider)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithProvider(googleProvider)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="login-background__container">
            <div className="login__form">
                <h2 className="login__title">Login</h2>
                <div className="login-with__social">
                    <button onClick={loginWithFacebook} className="button-login__facebook">
                        Facebook
                    </button>
                    <button onClick={loginWithGoogle} className="button-login__google">
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

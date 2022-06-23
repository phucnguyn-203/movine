// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaonDr_4-MqRWWQuVnKZ3Qy3MGzZozCDg",
    authDomain: "movine-98361.firebaseapp.com",
    projectId: "movine-98361",
    storageBucket: "movine-98361.appspot.com",
    messagingSenderId: "26217004666",
    appId: "1:26217004666:web:cc8e8dbffa6466b7ee05c3",
    measurementId: "G-FERMRBKT15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authenticate = getAuth(app);
const database = getFirestore(app);

export { authenticate }

const signInWithProvider = async (provider) => {
    const response = await signInWithPopup(authenticate, provider);
    const additionUserInfo = getAdditionalUserInfo(response);
    console.log(additionUserInfo);
}

export { signInWithProvider }
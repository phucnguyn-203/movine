// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import {
    getFirestore,
    setDoc,
    doc,
    Timestamp,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBaonDr_4-MqRWWQuVnKZ3Qy3MGzZozCDg',
    authDomain: 'movine-98361.firebaseapp.com',
    projectId: 'movine-98361',
    storageBucket: 'movine-98361.appspot.com',
    messagingSenderId: '26217004666',
    appId: '1:26217004666:web:cc8e8dbffa6466b7ee05c3',
    measurementId: 'G-FERMRBKT15',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authenticate = getAuth(app);
const database = getFirestore(app);

export { authenticate, database };

const setDocument = async (collection, id, data) => {
    await setDoc(doc(database, collection, id), {
        ...data,
        createAt: Timestamp.fromDate(new Date()),
    });
};

export { setDocument };

const addDocument = async (collectionName, data) => {
    await addDoc(collection(database, collectionName), {
        ...data,
        createdAt: Timestamp.fromDate(new Date()),
    });
};
export { addDocument };

const getDocumentsByCondition = async (collectionName, condition) => {
    const documents = [];
    const q = query(
        collection(database, collectionName),
        where(condition.field, condition.operator, condition.expressions),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        documents.push(doc.data());
    });
    return documents;
};

export { getDocumentsByCondition };

const deleteDocument = async (collectionName, id) => {
    await deleteDoc(doc(database, collectionName, id));
};

export { deleteDocument };

const signInWithProvider = async (provider) => {
    const response = await signInWithPopup(authenticate, provider);
    const additionUserInfo = getAdditionalUserInfo(response);
    if (additionUserInfo.isNewUser) {
        const { user } = response;
        const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        };
        try {
            await setDocument('users', user.uid, userData);
        } catch (err) {
            console.log(err);
        }
    }
};

export { signInWithProvider };

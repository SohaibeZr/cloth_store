import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwSMWXmQjLw285giSmBaBw9JfXiB1mnFs",
    authDomain: "cloth-store-b0853.firebaseapp.com",
    projectId: "cloth-store-b0853",
    storageBucket: "cloth-store-b0853.appspot.com",
    messagingSenderId: "557004000971",
    appId: "1:557004000971:web:e61786580647a3b96ed54e",
    measurementId: "G-05T9Q618HE"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc; 
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if (!userAuth) return;
    
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user' + error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async ( email, password ) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword( auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (callback) =>
    onAuthStateChanged(auth, callback)
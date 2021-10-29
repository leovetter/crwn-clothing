import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection  } from 'firebase/firestore';

const config = {
apiKey: "AIzaSyCPuS02fn3z4ZGjagpU_cTGHytpbyez5vg",
    authDomain: "crwn-db-c9df9.firebaseapp.com",
    projectId: "crwn-db-c9df9",
    storageBucket: "crwn-db-c9df9.appspot.com",
    messagingSenderId: "72298035874",
    appId: "1:72298035874:web:3bcccd7695a45c52ebf5fb",
    measurementId: "G-1P5W8YDZXB"
};

initializeApp(config);


const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const auth = getAuth();
export const SignInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (authUser, additionalData) => {

    if (!authUser) return;

    const db = getFirestore();

    let docRef = doc(db, "user", authUser.uid);
    let docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {

        const { displayName, email } = authUser;
        const createdAt = new Date();

        const userRef = collection(db, "user");

        await setDoc(doc(userRef, authUser.uid), {
            displayName,
            email,
            createdAt,
            ...additionalData
        });

        docRef = doc(db, "user", authUser.uid);
        docSnap = await getDoc(docRef);

        return docSnap.data();

    } else {

        return docSnap.data();
    }
}
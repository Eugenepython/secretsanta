import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    addDoc,
} from 'firebase/firestore';
import { auth, db } from './Config';

function Login() {
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if the user's email is already in the database
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', user.email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // If the email is not in the database, register the user
                const newUserDocRef = await addDoc(usersRef, { email: user.email });

                // Create a reference to the 'profile' subcollection
                //const userProfileCollectionRef = collection(newUserDocRef, 'profile');

                // Add a document to the 'profile' subcollection
                //await addDoc(userProfileCollectionRef, { name: user.displayName });

                // Redirect to the homepage after registration
                navigate('/yourpage');
            } else {
                // If the email is already in the database, log in and redirect
                navigate('/yourpage');
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className='wholeThing'>
            <h1>Login</h1>
            <button className='funButton' onClick={handleSignInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default Login;

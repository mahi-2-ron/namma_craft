import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
// Replace these with your actual Firebase project credentials
// Go to https://console.firebase.google.com → Create Project → 
// Project Settings → Add Web App → Copy config
const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyReplaceMeWithYourActualKey",
    authDomain: "namma-craft.firebaseapp.com",
    projectId: "namma-craft",
    storageBucket: "namma-craft.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Add scopes for Google profile info
googleProvider.addScope('profile');
googleProvider.addScope('email');

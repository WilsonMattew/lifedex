// Import the necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIkxha_buuEwbiDN0BNsQIcYJenHB1ofU",
    authDomain: "sample-lifedex.firebaseapp.com",
    projectId: "sample-lifedex",
    storageBucket: "sample-lifedex.appspot.com",
    messagingSenderId: "863689370916",
    appId: "1:863689370916:web:4ccf017a92dc115405d7b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Authentication functions
document.getElementById('login').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('User signed in:', result.user);
        })
        .catch((error) => {
            console.error('Error signing in:', error);
        });
});

document.getElementById('logout').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('app-container').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
    }
});



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

// Handle sign-in
document.getElementById('login').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('User signed in:', result.user);
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('app-container').style.display = 'block';
            document.getElementById('logout').style.display = 'block';
        })
        .catch((error) => {
            console.error('Error signing in:', error);
        });
});

// Handle sign-out
document.getElementById('logout').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out');
            document.getElementById('auth-container').style.display = 'block';
            document.getElementById('app-container').style.display = 'none';
            document.getElementById('logout').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});

// Listen for authentication state changes
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

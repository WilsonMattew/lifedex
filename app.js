import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIkxha_buuEwbiDN0BNsQIcYJenHB1ofU",
    authDomain: "sample-lifedex.firebaseapp.com",
    projectId: "sample-lifedex",
    storageBucket: "sample-lifedex.appspot.com",
    messagingSenderId: "863689370916",
    appId: "1:863689370916:web:4ccf017a92dc115405d7b1",
    measurementId: "G-V08XENDCFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Handle login
document.getElementById('login').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('User signed in:', result.user);
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('camera-container').style.display = 'block';
        })
        .catch((error) => {
            console.error('Error signing in:', error);
        });
});

// Handle logout
document.getElementById('logout').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out');
            document.getElementById('auth-container').style.display = 'block';
            document.getElementById('camera-container').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('camera-container').style.display = 'block';
    } else {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('camera-container').style.display = 'none';
    }
});

// Webcam capture logic
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const result = document.getElementById('result');
    const capturedImage = document.getElementById('captured-image');
    const snapButton = document.getElementById('snap');

    // Request access to the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(error => {
            console.error('Error accessing webcam:', error);
        });

    // Capture a photo
    snapButton.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        capturedImage.src = imageData;
        result.style.display = 'block';
    });
});

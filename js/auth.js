// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIkxha_buuEwbiDN0BNsQIcYJenHB1ofU",
  authDomain: "sample-lifedex.firebaseapp.com",
  projectId: "sample-lifedex",
  storageBucket: "sample-lifedex.appspot.com",
  messagingSenderId: "863689370916",
  appId: "1:863689370916:web:4ccf017a92dc115405d7b1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google Sign-In provider
const provider = new firebase.auth.GoogleAuthProvider();

// Function to handle login
function loginWithGoogle() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = result.credential;
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('User logged in:', user.displayName);
      app.isLoggedIn = true;
      updateUI();
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login error:', errorMessage);
    });
}

// Function to handle logout
function logout() {
  firebase.auth().signOut().then(() => {
    console.log('User signed out');
    app.isLoggedIn = false;
    updateUI();
  }).catch((error) => {
    console.error('Logout error:', error);
  });
}

// Listen for auth state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    app.isLoggedIn = true;
  } else {
    // User is signed out
    app.isLoggedIn = false;
  }
  updateUI();
});

// Make sure to expose the loginWithGoogle and logout functions globally
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;

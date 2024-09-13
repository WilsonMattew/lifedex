// app.js

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Application state
const app = {
    isLoggedIn: false,
    currentPage: 'home'
};

// Page routing
function navigateTo(page) {
    app.currentPage = page;
    updateUI();
}

// Update UI based on current state
function updateUI() {
    const mainContent = document.getElementById('app');
    mainContent.innerHTML = ''; // Clear current content

    switch (app.currentPage) {
        case 'home':
            mainContent.innerHTML = '<h2>Welcome to LifeDex</h2><p>Explore the world around you!</p>';
            break;
        case 'scan':
            mainContent.innerHTML = '<h2>Scan an Object</h2><input type="file" accept="image/*" id="imageUpload">';
            document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
            break;
        case 'profile':
            if (app.isLoggedIn) {
                mainContent.innerHTML = '<h2>Your Profile</h2><p>Profile information will be displayed here.</p>';
            } else {
                mainContent.innerHTML = '<h2>Login Required</h2><button id="loginBtn">Login with Google</button>';
                document.getElementById('loginBtn').addEventListener('click', loginWithGoogle);
            }
            break;
    }
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Here you would typically send the file to your image recognition API
        console.log('Image uploaded:', file.name);
        // For now, we'll just display a placeholder result
        document.getElementById('app').innerHTML += '<p>Analyzing image...</p>';
    }
}

// Initialize the application
function init() {
    // Set up navigation event listeners
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.getAttribute('href').substr(1));
        });
    });

    // Initial UI update
    updateUI();
}

// Run the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

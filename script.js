// script.js

// Function to handle login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Logic for login validation
    console.log('Logging in with', username);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevents the default form submission
    const formData = new FormData(event.target);
    // Process form data
    console.log('Form data submitted:', Object.fromEntries(formData));
}

// Function to initialize interactive features
function initInteractiveFeatures() {
    document.getElementById('loginButton').addEventListener('click', handleLogin);
    document.getElementById('form').addEventListener('submit', handleFormSubmit);
}

// Call the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initInteractiveFeatures);
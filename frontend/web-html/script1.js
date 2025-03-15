// script.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let emailOrUserId = document.getElementById("emailOrUserId").value;
    let password = document.getElementById("password").value;
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let isValid = true;

    emailError.textContent = "";
    passwordError.textContent = "";

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (!emailOrUserId) {
        emailError.textContent = "Email/User ID is required";
        isValid = false;
    } else if (!validateEmail(emailOrUserId) && emailOrUserId.length < 5) {
        emailError.textContent = "Enter a valid email or User ID (min 5 chars)";
        isValid = false;
    }

    if (!password) {
        passwordError.textContent = "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
    }

    if (isValid) {
        alert("Login successful!");
    }
});

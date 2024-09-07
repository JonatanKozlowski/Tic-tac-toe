// Strona logowania (login.html)

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;

    if (username) {
        // Zapisz nazwę użytkownika do localStorage
        localStorage.setItem("username", username);

        // Przekieruj na stronę mainSite.html
        window.location.href = "mainSite.html";
    } else {
        alert("Proszę wprowadzić nazwę użytkownika.");
    }
});

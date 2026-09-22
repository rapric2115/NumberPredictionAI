console.log("LOGIN>JS STARTED");

// =========================================================
// Login Form
// =========================================================

const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginButtonText = document.getElementById("loginButtonText");
const loginMessage = document.getElementById("loginMessage");


// =========================================================
// Form Submission
// =========================================================

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Get form values
    const email = document
        .getElementById("email")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value;


    // Clear previous message
    hideMessage();


    // =====================================================
    // Basic Validation
    // =====================================================

    if (email === "") {

        showMessage(
            "Email is required.",
            "error"
        );

        return;
    }


    if (password === "") {

        showMessage(
            "Password is required.",
            "error"
        );

        return;
    }


    // =====================================================
    // Disable Login Button
    // =====================================================

    loginButton.disabled = true;

    loginButtonText.textContent = "Authenticating...";


    try {

        // =================================================
        // Send request to PHP
        // =================================================

        const response = await fetch("../api/login.php", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });


        // =================================================
        // Read response
        // =================================================

        const responseText = await response.text();

        console.log("HTTP Status:", response.status);

        console.log(
            "PHP Raw Response:",
            responseText
        );


        let data;


        try {

            data = JSON.parse(responseText);

        } catch (error) {

            console.error(
                "PHP did not return valid JSON."
            );

            console.error(
                "Raw response:",
                responseText
            );

            showMessage(
                "Server returned an invalid response.",
                "error"
            );

            return;
        }


        console.log(
            "PHP response:",
            data
        );


        // =================================================
        // Login Successful
        // =================================================

        if (data.success) {

            showMessage(
                data.message,
                "success"
            );


            // Redirect after successful login
            setTimeout(function () {

                window.location.href = "index.html";

            }, 1000);

        }


        // =================================================
        // Login Failed
        // =================================================

        else {

            showMessage(
                data.message || "Login failed.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showMessage(
            "Unable to connect to the server.",
            "error"
        );

    } finally {

        loginButton.disabled = false;

        loginButtonText.textContent =
            "Authenticate & Enter Console";

    }

});


// =========================================================
// Show Message
// =========================================================

function showMessage(text, type) {

    loginMessage.textContent = text;

    loginMessage.className =
        "rounded-lg px-4 py-3 text-sm";


    if (type === "success") {

        loginMessage.classList.add(
            "bg-secondary-container",
            "text-on-secondary-container"
        );

    } else {

        loginMessage.classList.add(
            "bg-error-container",
            "text-error"
        );

    }

}


// =========================================================
// Hide Message
// =========================================================

function hideMessage() {

    loginMessage.className =
        "hidden rounded-lg px-4 py-3 text-sm";

    loginMessage.textContent = "";

}


// =========================================================
// Password Visibility
// =========================================================

const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");


if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                togglePassword.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );

}
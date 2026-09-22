const menuBtn = document.getElementById("mobile-menu-btn");
const closeBtn = document.getElementById("close-drawer-btn");
const drawer = document.getElementById("mobile-drawer");
const drawerContent = document.getElementById("drawer-content");

// =========================================================
// Registration Form
// =========================================================

const registerForm = document.getElementById("registerForm");
const registerButton = document.getElementById("registerButton");
const buttonText = document.getElementById("buttonText");
const message = document.getElementById("message");


// =========================================================
// Form Submission
// =========================================================

registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirm_password").value;


        console.log('This is the password',password);
        console.log("this is the confirmation_Pass", confirmPassword);

    // Clear previous message
    hideMessage();


    // =====================================================
    // Validate Password Match
    // =====================================================

    if (password !== confirmPassword) {

        showMessage(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    // =====================================================
    // Validate Password Length
    // =====================================================

    if (password.length < 8) {

        showMessage(
            "Password must contain at least 8 characters.",
            "error"
        );

        return;
    }


    // =====================================================
    // Disable Button
    // =====================================================

    registerButton.disabled = true;
    buttonText.textContent = "Creating Account...";


    try {

        // =================================================
        // Send request to PHP API
        // =================================================

        const response = await fetch("api/register.php", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });


        // =================================================
        // Read PHP response
        // =================================================

        // const data = await response.json();


        // console.log("PHP response:", data);

        const responseText = await response.text();

        console.log("HTTP Status:", response.status);
        console.log("PHP Raw Response:", responseText);

        let data;

        try {
            data = JSON.parse(responseText);
        } catch (error) {

            console.error("PHP did not return valid JSON.");
            console.error("Raw response:", responseText);

            showMessage(
                "Server returned an invalid response.",
                "error"
            );

            return;
        }

        console.log("PHP response:", data);


        // =================================================
        // Success
        // =================================================

        if (data.success) {

            showMessage(
                data.message,
                "success"
            );

            registerForm.reset();


            // Redirect to login page

            setTimeout(function () {

                window.location.href = "login.html";

            }, 1500);

        }


        // =================================================
        // Error
        // =================================================

        else {

            showMessage(
                data.message || "Registration failed.",
                "error"
            );
        }

    }


    // =====================================================
    // Connection / JavaScript Error
    // =====================================================

    catch (error) {

        console.error(
            "Registration error:",
            error
        );

        showMessage(
            "Unable to connect to the server.",
            "error"
        );
    }


    // =====================================================
    // Re-enable Button
    // =====================================================

    finally {

        registerButton.disabled = false;

        buttonText.textContent = "Create Account";
    }

});


// =========================================================
// Show Message
// =========================================================

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        "rounded-lg px-4 py-3 text-body-sm";


    if (type === "success") {

        message.classList.add(
            "bg-secondary-container",
            "text-on-secondary-container"
        );

    } else {

        message.classList.add(
            "bg-error-container",
            "text-error"
        );
    }
}


// =========================================================
// Hide Message
// =========================================================

function hideMessage() {

    message.className =
        "hidden rounded-lg px-4 py-3 text-body-sm";

    message.textContent = "";
}


// =========================================================
// Password Visibility
// =========================================================

function togglePass(id, button) {

    const input = document.getElementById(id);

    const icon =
        button.querySelector(".material-symbols-outlined");


    if (!input) {

        console.error(
            "Password input not found:",
            id
        );

        return;
    }


    if (input.type === "password") {

        input.type = "text";

        icon.textContent = "visibility_off";

    } else {

        input.type = "password";

        icon.textContent = "visibility";
    }
}


// Drawer Toggler

function toggleDrawer() {

    if (drawer.classList.contains("hidden")) {

        drawer.classList.remove("hidden");

        setTimeout(() => {
            drawerContent.classList.remove("-translate-x-full");
        }, 10);

    } else {

        drawerContent.classList.add("-translate-x-full");

        setTimeout(() => {
            drawer.classList.add("hidden");
        }, 300);
    }
}


// Attach event listeners AFTER defining the function

if (menuBtn) {
    menuBtn.addEventListener("click", toggleDrawer);
}

if (closeBtn) {
    closeBtn.addEventListener("click", toggleDrawer);
}

if (drawer) {

    drawer.addEventListener("click", (e) => {

        if (e.target === drawer) {
            toggleDrawer();
        }

    });
}
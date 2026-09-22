async getCurrentUser () => {
    try {
        const response = await fetch("../api/current-user.php", {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        if(!data.success) {
            console.log("User is not logged in.");
            // Redirect to login 
            window.location.href = "login.html";

            return;
        }

        console.log("Data: ", data);
        console.log("User ID: ", data.user.id);
        console.log("Name: ", data.user.name);
        console.log("email: ", data.user.email);
        console.log("role: ", data.user.role);

        // Displaying user Name
        document.getElementById("userName").textContent = data.user.name;
        
    } catch(error) {
        console.error("Error retreiving user: ", error);
    }

}

getCurrentUser();
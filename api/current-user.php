<?php 
    header("Content-Type: application/json; charset=utf-8");
    session_start();

    // Check if user is logged in 
    if(!isset($_SESSION["user_id"])) {
        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "User is not logged in."
        ]);

        exit;
    }

    // Return logged-in user's information
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $_SESSION["user_id"],
            "name" => $_SESSION["user_name"],
            "email" => $_SESSION["user_email"],
            "role" => $_SESSION["role"]
        ]
    ]);

    exit

?>
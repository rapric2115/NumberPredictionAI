<?php

header("Content-Type: application/json; charset=utf-8");

require_once "../config/database.php";

session_start();

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);

    exit;
}

// Get JSON request body
$data = json_decode(
    file_get_contents("php://input"),
    true
);

// Validate JSON
if (!is_array($data)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid request data."
    ]);

    exit;
}

// Get submitted values
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please provide a valid email address."
    ]);

    exit;
}

// Validate password
if ($password === "") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Password is required."
    ]);

    exit;
}

try {

    // Find user by email
    $stmt = $pdo->prepare(
        "SELECT id, name, email, password_hash, role
         FROM users
         WHERE email = :email
         LIMIT 1"
    );

    $stmt->execute([
        ":email" => $email
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // User does not exist
    if (!$user) {

        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password."
        ]);

        exit;
    }

    // Verify password
    if (!password_verify($password, $user["password_hash"])) {

        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password."
        ]);

        exit;
    }

    // Regenerate session ID after successful authentication
    session_regenerate_id(true);

    // Store authenticated user information
    $_SESSION["user_id"] = $user["id"];
    $_SESSION["user_name"] = $user["name"];
    $_SESSION["user_email"] = $user["email"];
    $_SESSION["role"] = $user["role"];

    // Successful login
    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "id" => $user["id"],
            "name" => $user["name"],
            "email" => $user["email"],
            "role" => $user["role"]
        ]
    ]);

    exit;

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "An unexpected database error occurred."
    ]);

    exit;
}

?>

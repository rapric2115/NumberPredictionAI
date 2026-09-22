<?php

header("Content-Type: application/json");

require_once "../config/database.php";

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;
}

// Read JSON request
$rawInput = file_get_contents("php://input");

$data = json_decode($rawInput, true);

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
$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";
$confirmPassword = $data["confirmPassword"] ?? "";

// Validate name
if ($name === "") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Name is required."
    ]);

    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please provide a valid email address."
    ]);

    exit;
}

// Validate password length
if (strlen($password) < 8) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Password must contain at least 8 characters."
    ]);

    exit;
}

// Validate password confirmation
if ($password !== $confirmPassword) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Passwords do not match."
    ]);

    exit;
}

try {

    // Check if email already exists
    $stmt = $pdo->prepare(
        "SELECT id
         FROM users
         WHERE email = :email
         LIMIT 1"
    );

    $stmt->execute([
        ":email" => $email
    ]);

    if ($stmt->fetch()) {

        http_response_code(409);

        echo json_encode([
            "success" => false,
            "message" => "An account with this email already exists."
        ]);

        exit;
    }

    // Hash password
    $passwordHash = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    // Insert user
    $stmt = $pdo->prepare(
        "INSERT INTO users
        (name, email, password_hash)
        VALUES
        (:name, :email, :password_hash)"
    );

    $stmt->execute([
        ":name" => $name,
        ":email" => $email,
        ":password_hash" => $passwordHash
    ]);

    // Successful response
    echo json_encode([
        "success" => true,
        "message" => "Account created successfully."
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "An unexpected database error occurred."
    ]);

}
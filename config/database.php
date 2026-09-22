<?php

header("Content-Type: application/json");

$host = "sql207.my-php.net";
$dbname = "my_42894434_lottery";
$username = "my_42894434";
$password = "bj1qw8nc";

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

    $pdo->setAttribute(
        PDO::ATTR_DEFAULT_FETCH_MODE,
        PDO::FETCH_ASSOC
    );

} catch (PDOException $e) {

    http_response_code(500);

    die("Database connection failed.");
}
<?php
// Połączenie z bazą danych
$servername = "jonatan579.mysql.db";
$username = "jonatan579";
$password = "yaGKE7bAriBxy8X";
$dbname = "jonatan579";

$conn = new mysqli($servername, $username, $password, $dbname);

// Sprawdzenie połączenia
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Pobieranie danych POST
$username = $_POST['username'] ?? null;
$score = $_POST['score'] ?? null;
$game_name = $_POST['game_name'] ?? null;

if (!$username || !$score || !$game_name) {
    echo "Brak wymaganych danych";
    exit;
}

// Sprawdzanie czy użytkownik istnieje, jeśli nie, dodaj go
$sql = "SELECT id FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $user_id = $row['id'];
} else {
    $sql = "INSERT INTO users (username) VALUES ('$username')";
    if ($conn->query($sql) === TRUE) {
        $user_id = $conn->insert_id;
    } else {
        echo "Błąd podczas dodawania użytkownika: " . $conn->error;
        exit;
    }
}

// Zapis wyniku
$sql = "INSERT INTO scores (user_id, score, game_name) VALUES ($user_id, $score, '$game_name')";
if ($conn->query($sql) === TRUE) {
    echo "Nowy wynik został zapisany";
} else {
    echo "Błąd podczas zapisywania wyniku: " . $conn->error;
}

$conn->close();
?>

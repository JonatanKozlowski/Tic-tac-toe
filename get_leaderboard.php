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

// Pobieranie wyników
$game_name = $_GET['game_name'];
$sql = "SELECT u.username, s.score 
        FROM scores s 
        JOIN users u ON s.user_id = u.id 
        WHERE s.game_name='$game_name' 
        ORDER BY s.score DESC 
        LIMIT 5";
$result = $conn->query($sql);

$scores = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }
}

echo json_encode($scores);

$conn->close();
?>

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


// ✅ Load environment variables from .env file (Optional)
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Retrieve JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate request parameters
if (!isset($data['recipientEmail']) || !isset($data['subject']) || !isset($data['message'])) {
    echo json_encode(["status" => "error", "message" => "Invalid request parameters"]);
    exit;
}

$recipientEmail = $data['recipientEmail'];
$subject = $data['subject'];
$message = $data['message'];

$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    // ✅ Securely Fetch Environment Variables
    $mail->Username = $_ENV['SMTP_EMAIL'] ?? getenv('SMTP_EMAIL') ?? '';  
    $mail->Password = $_ENV['SMTP_PASSWORD'] ?? getenv('SMTP_PASSWORD') ?? '';  

    if (empty($mail->Username) || empty($mail->Password)) {
        throw new Exception("SMTP credentials not found in environment variables.");
    }

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email Content
    $mail->setFrom($mail->Username, 'Book Exchange Platform');
    $mail->addAddress($recipientEmail);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = "<p>{$message}</p>";

    if ($mail->send()) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Email sending failed."]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Mailer Error: {$mail->ErrorInfo}"]);
}


?>

<?php 
header("Access-Control-Allow-Origin: *");

use PHPMailer\PHPMailer\PHPMailer;

require "./PHPMailer-6.9.1/src/PHPMailer.php";
require "./PHPMailer-6.9.1/src/SMTP.php";
require "./PHPMailer-6.9.1/src/Exception.php";

$mdp = "";

$email = $_POST['email'];

$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";
$mail->Encoding = "base64";
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; 
$mail->IsHTML(true);
$mail->Username = "centremaitaiplongee@gmail.com";// Addresse email de l'expéditeur à modifier
$mail->Password = "nlftpbdhhdhmqoxc";// Mot de passe de l'adresse email à modifier
$mail->SetFrom("centremaitaiplongee@gmail.com");// Addresse email de l'expéditeur à modifier

$mail->AddAddress($email); 



if(isset($_POST['file'])) {
    $mail->Subject = "Convention Club Maïtaï";
    $mail->addAttachment("../convention_club.docx");

    $mail->Body = "
<!DOCTYPE html>
<html lang=\"fr\"> 
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>Convention Club</title>
</head>
<body>
    <div style=\"max-width: 600px; margin: 0 auto; padding: 20px;\">
        <h2 style=\"color: #005C8F\"><span style=\"background-color:#005C8F;\"></span>Convention Club<br></h2>
        <p>Bonjour,</p>
        <p>Vous trouverez ci-joint la convention du club de plongée Maitai.</p>
        <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.</p>
        <p>Merci.</p>
        <p>L'équipe de Maitai.</p>
    </div>
</body>";

} else {
    $recup = $_POST['recup'] == "true" ? "Réinitialisation" : "Création";
    $mail->Subject = $recup . " de votre mot de passe Maitai";
    $mdp = generateMdp();

    $mail->Body = "
<!DOCTYPE html>
<html lang=\"fr\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>" . $recup . " de mot de passe</title>
</head>
    <body>
        <div style=\"max-width: 600px; margin: 0 auto; padding: 20px;\">
            <h2 style=\"color: #005C8F\"><span style=\"background-color:#005C8F;\"></span>" . $recup . " de mot de passe<br></h2>
            <p>Bonjour,</p>
            <p>Vous avez demandé la " . strtolower($recup) . " de votre mot de passe pour votre compte.</p>
            <p id=\"resetCode\" style=\"font-size: 31px; text-align: center; color: #ffffff; background-color: #005C8F\"><strong>" . $mdp . "</strong><br></p>
            <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.</p>
            <p>Merci.</p>
            <p>L'équipe de Maitai.</p>
        </div>
    </body>
</body>
</html>";
}




if($mail->Send()){
    echo $mdp;
}else{
    echo "Error in mail sending";
}


function generateMdp() : string {
    $mdp = "";
    $chars = "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for($i = 0; $i < 8; $i++) {
        if($i % 4 == 0 && $i != 0) {
            $mdp .= "-";
        }
        $mdp .= $chars[rand(0, strlen($chars) - 1)];
    }
    return $mdp;
}
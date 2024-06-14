<?php 
header("Access-Control-Allow-Origin: *");
include_once './inc/DB.inc.php';


use PHPMailer\PHPMailer\PHPMailer;

require "./PHPMailer-6.9.1/src/PHPMailer.php";
require "./PHPMailer-6.9.1/src/SMTP.php";
require "./PHPMailer-6.9.1/src/Exception.php";




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
$mail->Subject = "Alerte sécurité plongée";
if(isset($_POST['timer'])) {
    $alerte = palanqueesDansLesTemps();
    if($alerte == '') return;

    $mail->Body = "<!DOCTYPE html>
    <html lang=\"fr\">
    <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>Alerte sécurité plongée</title>
    </head>
    <body>
        <h1>Alerte sécurité plongée</h1>
        <p>Les palanquées suivantes ne sont pas sorties à temps :</p>
        <ul>
            $alerte
        </ul>
    </body>";
} else {
    $mail->Body = "<!DOCTYPE html>
    <html lang=\"fr\">
    <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>Alerte sécurité plongée</title>
    </head>
    <body>" . $_POST['alerte'] . "</body>";
}

foreach (DB::getInstance()->getEmailsAdmin() as $email) {
    $mail->AddAddress($email);
}

$mail->send();

palanqueesDansLesTemps() {
    $alerte = '';
    //TODO : récupérer tout les timers en cours, et vérifier si ils sont dans les temps
    // si dans les temps, ne rien faire, sinon ajouter à la variable $alerte le nom de la palanquée, l'heure d'entrée et le temps d'immersion (sous forme de <li></li>)
}
?>
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

function palanqueesDansLesTemps() {
    $alerte = '';
    foreach (DB::getInstance()->getPalanquees() as $palanquee) {
        if($palanquee->getAlerte() == 0) {
            list($heure, $minute) = explode(':', $palanquee->getHd());

            $hdMin = $heure * 60 + $minute;

            $hsPrev = $hdMin + $palanquee->getDuree();

            $hActuelle = date('H') * 60 + date('i');

            if($hActuelle > $hsPrev) {
                $alerte .= "<li>La Palanquée " . $palanquee->getNomPlongeurs() . " est rentrée à " . $palanquee->getHd() . " pour " . $palanquee->getDuree() . "</li>";
                $palanquee->setAlerte(1);
                DB::getInstance()->updatePalanquee($palanquee);
            }
        }
    }
    return $alerte;
}
?>
<?php
header('Cross-Origin-Opener-Policy: same-origin');

$idhist = $_POST['idhist'];

$chemin = DB::getInstance()->getHistoriquesById($idhist);

$fileContent = file_get_contents($chemin);

echo json_encode($fileContent);
<?php
header('Access-Control-Allow-Origin: *');

$dir = '../../../config/imgAccueil';
$cheminImg = 'https://maitai-becon.wuaze.com/config/img/imgAccueil/';

// Vérifiez si le répertoire existe et est accessible en lecture
if (is_dir($dir) && is_readable($dir)) {
    // Obtenez la liste des fichiers dans le répertoire
    $files = scandir($dir);
    
    // Filtrez les fichiers pour ne conserver que les images (extensions .jpg, .jpeg, .png, etc.)
    $imageFiles = array_filter($files, function($file) {
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        return in_array(strtolower($extension), array('jpg', 'jpeg', 'png', 'gif'));
    });

    // Créez un tableau pour stocker les données des images
    $imagesUrl = [];

    // Ajoutez les données de chaque image au tableau
    foreach ($imageFiles as $imageFile) {
        $imagesUrl[] = $cheminImg . $imageFile;
    }

    // Convertissez le tableau en JSON pour le renvoyer
    header('Content-Type: application/json');
    echo json_encode($imagesUrl);
} else {
    http_response_code(404);
    echo json_encode(array('error' => 'Le répertoire spécifié n\'existe pas ou n\'est pas accessible en lecture.'));
}
//export const cheminPHP = "https://maitai-becon.wuaze.com/php/other/";
//export const cheminPHP = "http://172.26.4.207/Maitai/src/php/other/";
//export const cheminPHP = "http://192.168.1.65/Maitai/src/php/other/";
export const cheminPHP = "http://192.168.195.64/Maitai/src/php/other/";
// export const cheminPHP = "http://localhost/Maitai/src/php/other/";

export const nivEncadrant = [''];
export const nivGeneral   = [''];
export const nivDP        = [''];
export const nivSecu      = [''];

fetch(cheminPHP + "config/GetNiveaux.php", {
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain; charset=UTF-8' // Spécifiez l'encodage ici
    },
}).then(response => {
    if (!response.ok) {
        throw new Error('Erreur de réseau !');
    }
    return response.json();
}).then(data => {
    nivEncadrant.push(...data.nivEncadrant);
    nivGeneral.push(...data.nivGeneral);
    nivDP.push(...data.nivDP);
    nivSecu.push(...data.nivSecu);
}).catch(error => {
    console.error('Erreur :', error);
});

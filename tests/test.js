document.addEventListener('DOMContentLoaded', function() {
    event.preventDefault();
    console.log('test');

    const btnSubmit = document.getElementById('btnSub');
    const type = document.getElementById('type');
    const file = document.getElementById('file');
    const idcli = document.getElementById('idcli');

    btnSubmit.addEventListener('click', function() {
        event.preventDefault();
        event.stopPropagation();
        const data = new FormData();
        data.append('idcli', idcli.value);
        data.append('type', type.value);
        data.append('file', file.files[0]);

        fetch('http://localhost/maitai/src/php/other/historique/CreationHistorique.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
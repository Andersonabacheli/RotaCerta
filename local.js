let watchID;

// Função para iniciar o rastreamento
document.getElementById("iniciarRastreamento").addEventListener("click", function() {
    if ("geolocation" in navigator) {
        watchID = navigator.geolocation.watchPosition(showPosition, showError, { 
            enableHighAccuracy: true, 
            timeout: 5000, 
            maximumAge: 0 
        });
    } else {
        document.getElementById("mensagem").innerHTML = "Geolocalização não suportada pelo seu navegador.";
    }
});

// Função para parar o rastreamento
document.getElementById("pararRastreamento").addEventListener("click", function() {
    if (watchID) {
        navigator.geolocation.clearWatch(watchID);
        document.getElementById("mensagem").innerHTML = "Rastreamento parado.";
    }
});

// Função para mostrar a posição atualizada
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Exibe a localização
    document.getElementById("mensagem").innerHTML = `Sua localização: Latitude: ${latitude} | Longitude: ${longitude}`;

    // Atualiza o mapa com a nova localização (opcional)
    var map = document.getElementById("mapa");
    var url = `https://www.google.com/maps?q=${latitude},${longitude}&hl=pt-br&z=14&output=embed`;
    map.innerHTML = `<iframe width="100%" height="100%" src="${url}" frameborder="0" style="border:0;" allowfullscreen></iframe>`;
}

// Função para lidar com erros de geolocalização
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("mensagem").innerHTML = "Usuário rejeitou a solicitação de geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("mensagem").innerHTML = "Informações de localização não disponíveis.";
            break;
        case error.TIMEOUT:
            document.getElementById("mensagem").innerHTML = "A solicitação de geolocalização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("mensagem").innerHTML = "Ocorreu um erro desconhecido.";
            break;
    }
}

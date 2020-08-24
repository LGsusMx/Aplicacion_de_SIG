const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');

const datosdelacuenta = document.querySelector('.datosdelacuenta');

const configurarMenu = (user) => {

    if (user) {

        db.collection('usuarios').doc(user.uid).get().then(doc => {

            const html = `
                <p>Nombre: ${ doc.data().nombre}</p>
                <p>Correo: ${ user.email}</p>
                <p>Teléfono: ${ doc.data().telefono}</p>
                <p>Dirección: ${ doc.data().direccion}</p>
                <p>Coordenadas: ${ doc.data().coordenadas.lat} , ${doc.data().coordenadas.lng}</p>
            `;
            datosdelacuenta.innerHTML = html;

        });

        listaloggedin.forEach(item => item.style.display = 'block');
        listaloggedout.forEach(item => item.style.display = 'none');
    } else {
        listaloggedin.forEach(item => item.style.display = 'none');
        listaloggedout.forEach(item => item.style.display = 'block');
    }
};

const obtieneAmigos = (data) => {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 21.152639, lng: -101.711598 },
        zoom: 14,
    });

    data.forEach(doc => {
        informacion = new google.maps.InfoWindow;

        var pos = {
            lat: doc.data().coordenadas.lat,
            lng: doc.data().coordenadas.lng
        };

        informacion.setPosition(pos);
        //informacion.setContent(doc.data().nombre + '\n' + doc.data().coordenadas.lat +' , '+ doc.data().coordenadas.lng);
        informacion.setContent(doc.data().nombre+ +' <br> '+doc.data().coordenadas.lat +' , '+ doc.data().coordenadas.lng+"<br> <img height='50' width='20' src='https://i.pinimg.com/originals/a6/26/90/a62690a205dab3f19082b30a8b41f8bc.png'>");
        informacion.open(map);
    });
}

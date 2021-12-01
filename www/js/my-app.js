// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
        {path: '/index/', url: 'index.html',},
        {path: '/Juego/', url: 'Juego.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    $$('#pageWeb').on('click', fnPagWeb)
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('Truco');
    $$('#a24').on('click', fnJuegoA24);
    $$('#a30').on('click', fnJuegoA30);
    $$('#botInic').on('click', fnIniciarJuego);
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="Juego"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('Iniciando Juego');
    fnNombres();
    fnAJugar();
    $$('#suma1').on('click', fnSuma1);
    $$('#suma2').on('click', fnSuma2);
    $$('#resta1').on('click', fnResta1);
    $$('#resta2').on('click', fnResta2);
    $$('#finalizar').on('click', fnFin);
})

puntaMax = 30
var device = navigator.userAgent

//Funciones
function fnIniciarJuego() {
    console.log('Iniciando Juego')
    mainView.router.navigate('/Juego/');    
}
function fnNombres() {
    Equipo1 = $$('#equipo1').val();
    Equipo2 = $$('#equipo2').val();
    console.log(Equipo1+" "+Equipo2);
    $$('#eq1').text(Equipo1);
    $$('#eq2').text(Equipo2);
}
function fnAJugar() {
    aJugar = $$('#aJugar').text();
    console.log(aJugar+"Aca");
        if (aJugar == "A 24") {
            console.log("A 24")
            $$('#max').text(aJugar);
            puntaMax = 24
        } else {
            console.log("A 30")
            $$('#max').text(aJugar);
            puntaMax = 30
        }
}
function fnJuegoA24() {
    Equipo1 = $$('#equipo1').val();
    Equipo2 = $$('#equipo2').val();
    if (Equipo1 != "" && Equipo2 != "") {
        $$('#aJugar').html("A 24")
        $$('#botInic').removeClass('oculto').addClass('visible');
    } else {
        $$('#error').html("Por favor complete los campos")
    }
    puntaMax = 24
}
function fnJuegoA30() {
    Equipo1 = $$('#equipo1').val();
    Equipo2 = $$('#equipo2').val();
    if (Equipo1 != "" && Equipo2 != "") {
        $$('#aJugar').html("A 30")
        $$('#botInic').removeClass('oculto').addClass('visible');
    } else {
        $$('#error').html("Por favor complete los campos")
    }
    puntaMax = 30
}
function fnSuma1() {
    console.log('Sumando Jug 1');
    PuntosJ1 = parseInt($$('#canPuntos1').text());
        if (PuntosJ1<puntaMax) {
            Suma1 = PuntosJ1 +1;
            console.log(Suma1);
            $$('#canPuntos1').text(Suma1);
            fnpintaFosf(1);
        } else {
            console.log("Ganador");
            $$('#canPuntos1').text("Gana");
        }
}
function fnSuma2() {
    console.log('Sumando Jug 2');
    PuntosJ2 = parseInt($$('#canPuntos2').text());
    if (PuntosJ2<puntaMax) {
            Suma2 = PuntosJ2 +1;
            console.log(Suma2);
            $$('#canPuntos2').text(Suma2);
            fnpintaFosf(2);
        } else {
            console.log("Ganador");
            $$('#canPuntos2').text("Gana");
        }
}
function fnResta1() {
    console.log('Restando Jug 1');
    PuntosJ1 = parseInt($$('#canPuntos1').text());
    if (PuntosJ1>0) {
        Resta1 = PuntosJ1 -1;
        console.log(Resta1);
        $$('#canPuntos1').text(Resta1);
        fnpintaFosf(1);
    }
}
function fnResta2() {
    console.log('Restando Jug 2');
    PuntosJ2 = parseInt($$('#canPuntos2').text());
    if (PuntosJ2>0) {
        Resta2 = PuntosJ2 -1;
        console.log(Resta2);
        $$('#canPuntos2').text(Resta2);
        fnpintaFosf(1);
    }
}
function fnFin() {
    console.log('Finalizar Juego');
    $$('#eq1').html("");
    $$('#eq2').html("");
    $$('#equipo1').val("");
    $$('#equipo2').val("");
    $$('#canPuntos1').html(00);
    $$('#canPuntos2').html(00);
    $$('#max').html("");
    $$('img').attr('src', 'img/0.png');
    fnVuelve();
}
function fnVuelve() {
    mainView.router.navigate('/index/');
}
function fnpintaFosf(equipo) {
    console.log('Entramos a pintar fosforos');
    pintar = parseInt($$('#canPuntos'+equipo).text());

        for (i=1 ; i<=6; i++) {
            if (puntaMax==24 && i==3) {
                if (pintar>=2) {
                    $$('#e'+equipo+i).attr('src', 'img/2.png');
                    pintar = pintar-2;
                } else {
                    $$('#e'+equipo+i).attr('src', 'img/'+pintar+'.png');
                      pintar=0;
                }
            } else {
                if (pintar>=5) {
                    $$('#e'+equipo+i).attr('src', 'img/5.png');
                    pintar=pintar-5;
                } else {
                    $$('#e'+equipo+i).attr('src', 'img/'+pintar+'.png');
                    pintar=0;
                }
            }
        }
}
function fnPagWeb() {
    console.log("Ingresando en la Web")
    if (device.match(/Android/i)) {
        window.location = "https://www.nhfournier.es/como-jugar/truco/"
    } else {
}}
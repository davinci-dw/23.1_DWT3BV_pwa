const URL = 'https://rickandmortyapi.com/api/character';

const convertirEnJSON = (response) => response.json();
const extraerNombres = (data) => data.results.map(personaje => personaje.name);
const extraerGenero = (data) => data.results.map(personaje => personaje.gender);
const esperarDosSegundos = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve("Se resolvio todo ok");
    }, 5000);
});

let eventoIntalar;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    eventoIntalar = e;
});

//const serviceWorkerEnable = navigator.serviceWorker && navigator.serviceWorker.register;

if(navigator.serviceWorker && navigator.serviceWorker.register) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
            console.log('Service worker registrado');
            if(reg.installing) {
                console.log('Service worker instalando');
            } else if(reg.waiting) {
                console.log('Service worker instalado');
            } else if(reg.active) {
                console.log('Service worker activo');
            }
    })
    .catch((err) => {
        console.log('Error al registrar el service worker', err);
    });
}

const app = new Vue(
    {
        el: '#app',
        data: {
            titulo: 'Hola mundo',
            mensaje: 'Hola mundo desde Vue',
            listaDeNombres: [],
            objetoGuardable: {}
            /*objectoGuardable: {
                nombre: 'Juan',
                apellido: 'Perez',
                edad: 30,
                gustos: ['futbol', 'peliculas', 'musica']
            }*/
        },
        mounted: function() {
            //console.log(localStorage.getItem('objectoGuardable'));
            //console.log(JSON.parse(localStorage.getItem('objectoGuardable')));
            //this.objetoGuardable = JSON.parse(localStorage.getItem('objectoGuardable'));
            //localStorage.setItem('objectoGuardable', JSON.stringify(this.objectoGuardable));
        },
        methods: {

            async presentarListaDeNombres() {
                const actualizarListaDeNombres = nombres => this.listaDeNombres = nombres;

                const nombres = await fetch(URL).then(extraerNombres);
                await esperarDosSegundos();
                const generos = await fetch(URL).then(convertirEnJSON).then(extraerGenero);
                const nombresConGenero = nombres.map((nombre, index) => {
                    return generos[index] + ' - ' + nombre;
                });
                actualizarListaDeNombres(nombresConGenero);
            },
            async saludar() {
                const actualizarListaDeNombres = nombres => this.listaDeNombres = nombres;

                const nombresLocales = localStorage.getItem('nombresConGenero');

                if(nombresLocales) {
                    console.log(JSON.parse(nombresLocales))
                    actualizarListaDeNombres(JSON.parse(nombresLocales));
                    return;
                }

                const query = Promise.all(
                    [
                            fetch(URL).then(convertirEnJSON).then(extraerNombres),
                            fetch(URL).then(convertirEnJSON).then(extraerGenero),
                            esperarDosSegundos()
                        ]
                )

                const [nombres, generos] = await query;
                const nombresConGenero = nombres.map((nombre, index) => {
                    return generos[index] + ' - ' + nombre;
                });
                actualizarListaDeNombres(nombresConGenero);
                localStorage.setItem('nombresConGenero', JSON.stringify(nombresConGenero));

                /*
                    //Lo que estaba antes
                    query.then((respuestas) => {
                    const nombres = respuestas[0];
                    const generos = respuestas[1];
                    const nombresConGenero = nombres.map((nombre, index) => {
                        return generos[index] + ' - ' + nombre;
                    });
                    actualizarListaDeNombres(nombresConGenero);

                });*/



            },
            instalarAplicacion() {
                if(!eventoIntalar) return;
                eventoIntalar.prompt();
                console.log("instalando app")
            }
        }
    }
)
// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    })
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validación...
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacío');
        return; // evita que se ejecuten más líneas de código
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet // es igual que poner tweet: tweet
    }

    // Añadir al array de tweets
    tweets = [...tweets, tweetObj];

    // una vez agregado vamos a crear el html
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar el mensaje en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


// Mostrar un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            // Agregar un botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el html
            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // Insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agregar los tweets actuales a Localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar el html
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
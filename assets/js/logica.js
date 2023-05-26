const URL_BASE = 'https://swapi.dev/api';
const URL_PEOPLE1 = URL_BASE + 'people/1';
const URL_PEOPLE2 = URL_BASE + 'people/2';
const URL_PEOPLE3 = URL_BASE + 'people/3';
const URL_PEOPLE4 = URL_BASE + 'people/4';
const URL_PEOPLE5 = URL_BASE + 'people/5';

let carta, boton, datos, notGo = false, gen;

function *tarjetaGenerador(datos) {
    carta.innerHTML = '';
    for (let temp of datos) {
        yield temp.name;
        carta.innerHTML += ` 
              <div id="tarjSola" class="card mb-3 container" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${temp.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">"NOMBRE: ${temp.name}"</h5>
              <p class="card-text">ESPECIE: "${temp.species}"</p>
             </div>
          </div>
        </div>
      </div>
         `;
         
    }
}

const revelaPersonaje = (event) => {
    event.preventDefault();
    if (!notGo) {
        const { value, done } = gen.next();
        console.log('value:', value);
        console.log('done:', done);
        notGo = done;
    } else {
        console.log('Nada más que mostrar');
        datos = undefined;
        boton.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    carta = document.getElementById('carta');
    boton = document.getElementById('boton');
    const results = await fetch(URL_CHARACTERS);
    const response = await results.json();
    datos = response.results;
    console.log('datos:', datos);
    gen = tarjetaGenerador(datos);
    gen.next();
    boton.addEventListener('mouseover', revelaPersonaje);
});
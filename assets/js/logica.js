const URL_BASE = 'https://swapi.dev/api';
const populares = document.getElementById('card1');
const infoPopulares = document.getElementById('info1');
const secundarios = document.getElementById('card2');
const infoSecundarios = document.getElementById('info2');
const significativos = document.getElementById('card3');
const infoSignificativos = document.getElementById('info3');

//OBTENCION DE DATOS
const request = async id => {
  const data = await fetch(URL_BASE + `/people/${id}`);
  const result = await data.json();
  return result;
}

//DEFINICION DE FUNCION GENERADORA
async function* getData(start, finish) {
  let id = start;
  do {
    const people = await request(id);
    yield people;
    id++
  } while (id <= finish);
}

//EJECUCION DE FUNCIONES GENERADORAS SEGUN RANGO
const popularesData = getData(1, 5);
const secundariosData = getData(6, 11);
const significativosData = getData(12, 17);

//SALIDA DE INFORMACION
const cardAdded = async (genFunction, tagHtml, classCirculo) => {
  let { value } = await genFunction.next();
  if (value) {
    return tagHtml.innerHTML += `

    <div class="card">
      <div class="card-body">
      <p class="${classCirculo}"></p>
        <h5 class="card-title text-capitalize">${value.name}</h5>
        <p class="card-text">Estatura: ${value.height} cm. Peso: ${value.mass} kg.</p>
      </div>
    </div>
    </div>
    `
  }
}

// INTERACCION USUARIO
populares.addEventListener('mouseover', () => cardAdded(popularesData, infoPopulares, 'circulo1'));
secundarios.addEventListener('mouseover', () => cardAdded(secundariosData, infoSecundarios, 'circulo2'));
significativos.addEventListener('mouseover', () => cardAdded(significativosData, infoSignificativos, 'circulo3'));
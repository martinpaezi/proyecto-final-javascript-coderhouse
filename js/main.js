const jugadores = [
  {
    id: 1,
    nombre: "Verón",
    posicion: "Mediocampista",
    precio: 25,
    contratado: false,
  },
  {
    id: 2,
    nombre: "Zidane",
    posicion: "Mediocampista",
    precio: 25,
    contratado: false,
  },
  {
    id: 3,
    nombre: "Casillas",
    posicion: "Arquero",
    precio: 15,
    contratado: false,
  },
  {
    id: 4,
    nombre: "Robben",
    posicion: "Delantero",
    precio: 20,
    contratado: false,
  },
  {
    id: 5,
    nombre: "Zanetti",
    posicion: "Defensor",
    precio: 15,
    contratado: false,
  },
  {
    id: 6,
    nombre: "Pirlo",
    posicion: "Mediocampista",
    precio: 15,
    contratado: false,
  },
  {
    id: 7,
    nombre: "Messi",
    posicion: "Delantero",
    precio: 30,
    contratado: false,
  },
  {
    id: 8,
    nombre: "Ronaldo",
    posicion: "Delantero",
    precio: 30,
    contratado: false,
  },
  {
    id: 9,
    nombre: "Xavi",
    posicion: "Mediocampista",
    precio: 20,
    contratado: false,
  },
  {
    id: 10,
    nombre: "Henry",
    posicion: "Delantero",
    precio: 25,
    contratado: false,
  },
  {
    id: 11,
    nombre: "Neymar",
    posicion: "Delantero",
    precio: 30,
    contratado: false,
  },
  {
    id: 12,
    nombre: "Ibrahimovic",
    posicion: "Delantero",
    precio: 20,
    contratado: false,
  },
  {
    id: 13,
    nombre: "Neuer",
    posicion: "Arquero",
    precio: 15,
    contratado: false,
  },
];

const jugadoresNoElegidos = document.getElementById("jugadoresNoElegidos");
const jugadoresElegidos = document.getElementById("jugadoresElegidos");
const presupuesto = document.getElementById("presupuesto-gastado");

const jugadoresGuardadosString = localStorage.getItem("jugadoresGuardados");
const jugadoresGuardados = jugadoresGuardadosString ? JSON.parse(jugadoresGuardadosString) : [];

function cargarJugadores() {
  jugadoresNoElegidos.innerHTML = '';

  jugadores.forEach((jugador) => {
    if (!jugador.contratado && !jugadoresGuardados.some((guardado) => guardado.id === jugador.id)) {
      let article = document.createElement("article");
      article.className = "card-jugador";
      article.innerHTML = `
        <h3>${jugador.nombre}</h3>
        <p>${jugador.posicion}</p>
        <p>${jugador.precio}M</p>
        <button id="${jugador.id}" class="boton-contratar">Contratar</button>
      `;
      jugadoresNoElegidos.append(article);

      const botonContratar = document.getElementById(jugador.id);
      botonContratar.addEventListener("click", () => contratarJugador(jugador));
    }
  });

  jugadoresElegidos.innerHTML = '';
  jugadoresGuardados.forEach((jugador) => {
    let article = document.createElement("article");
    article.className = "card-jugador";
    article.innerHTML = `
      <h3>${jugador.nombre}</h3>
      <p>${jugador.posicion}</p>
      <p>${jugador.precio}M</p>
      <button id="${jugador.id}" class="boton-despedir">Despedir</button>
    `;
    jugadoresElegidos.append(article);

    const botonDespedir = document.getElementById(jugador.id);
    botonDespedir.addEventListener("click", () => despedirJugador(jugador));
  });
  actualizarPresupuesto();
}

function contratarJugador(jugador) {
  if (jugador && !jugador.contratado) {
    jugador.contratado = true;
    jugadoresGuardados.push(jugador);
    guardarJugadoresEnLocalStorage();
    cargarJugadores();
  }
}

function despedirJugador(jugador) {
  const idJugador = jugador.id;
  const index = jugadoresGuardados.findIndex((jugador) => jugador.id === idJugador);

  if (index !== -1) {
    jugadoresGuardados.splice(index, 1);
    guardarJugadoresEnLocalStorage();
  }
  cargarJugadores();
}

function guardarJugadoresEnLocalStorage() {
  localStorage.setItem("jugadoresGuardados", JSON.stringify(jugadoresGuardados));
}

function actualizarPresupuesto() {
  const totalGastado = jugadoresGuardados.reduce((acc, jugador) => acc + jugador.precio, 0);
  presupuesto.textContent = `Presupuesto gastado: $${totalGastado}M`;
}

cargarJugadores();

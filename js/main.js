let jugadores = [];

fetch("./js/jugadores.json")
  .then(response => response.json())
  .then(data => {
    jugadores = data;
    cargarJugadores(jugadores)
  })

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
    Toastify({
      text: `¡Contrataste a ${jugador.nombre}!`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to left, #308080, #4e5aa0)",
      },
      onClick: function(){}
    }).showToast();
  }
}

function despedirJugador(jugador) {
  Swal.fire({
    title: `¿Querés despedir a ${jugador.nombre}?`,
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: `No`
  }).then((result) => {
    if (result.isConfirmed) {
      const idJugador = jugador.id;
      const index = jugadoresGuardados.findIndex((jugador) => jugador.id === idJugador);
      jugador.contratado = false;
    
      if (index !== -1) {
        jugadoresGuardados.splice(index, 1);
        guardarJugadoresEnLocalStorage();
      }
    
       Toastify({
         text: `¡Despediste a ${jugador.nombre}!`,
         duration: 3000,
         destination: "https://github.com/apvarun/toastify-js",
         newWindow: true,
         close: true,
         gravity: "top",
         position: "right",
         stopOnFocus: true,
         style: {
           background: "linear-gradient(to right, red, #4e5aa0)",
         },
         onClick: function(){}
       }).showToast();
    
       cargarJugadores();
    }
  });

}

function guardarJugadoresEnLocalStorage() {
  localStorage.setItem("jugadoresGuardados", JSON.stringify(jugadoresGuardados));
}

function actualizarPresupuesto() {
  const totalGastado = jugadoresGuardados.reduce((acc, jugador) => acc + jugador.precio, 0);
  presupuesto.textContent = `Presupuesto gastado: $${totalGastado}M`;
}

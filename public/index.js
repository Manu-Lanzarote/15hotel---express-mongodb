//Función para buscar un cliente por su DNI (No lo indica el ejercicio pero tenemos que encontrarlo primero si queremos editarlo)
mostrarClientes();
function mostrarClientes() {
  fetch("/clientes")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
      let clientes = "";
      for (let i = 0; i < datos.length; i++) {
        clientes += `
          <h3>Nombre y apellidos: <br> ${datos[i].nombre} ${datos[i].apellidos}</h3>
          <p>DNI: ${datos[i].dni}</p>
          <span>. . .</span>
          `;
      }
      document.getElementById("div1").innerHTML = clientes;
    });
}

//Igual para las habitaciones (prueba)
function mostrarHabitaciones() {
  fetch("/habitaciones")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
      let habitaciones = "";
      for (let i = 0; i < datos.length; i++) {
        habitaciones += `
            <p>Número de habitación: ${datos[i].numero_habitacion}</p>
            <p>Estado: ${datos[i].estado}</p>
            <span>. . .</span>
            `;
      }
      document.getElementById("div2").innerHTML = habitaciones;
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Registrar un nuevo cliente
function nuevoCliente() {
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let dni = document.getElementById("dni").value;

  const registrarCliente = {
    nombre,
    apellidos,
    dni,
  };
  console.log(registrarCliente);

  fetch("/registrarCliente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrarCliente),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      //Llamo a la primera función   mostrarCliente()  para refrescar automáticamente  con el nuevo registro
      mostrarClientes();
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Editar cliente
function editarCliente() {
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let dni = document.getElementById("dni").value;

  const modificar = {
    nombre,
    apellidos,
    dni,
  };
  console.log(modificar);
  fetch("/editarCliente", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modificar),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      //Llamo a la primera función   mostrarCliente()  para refrescar automáticamente  con los nuevos datos
      mostrarClientes();
    });
}

//Borrar cliente
function borrarCliente() {
  let dni = document.getElementById("dni").value;
  let borrarDni = {
    dni,
  };
  fetch("/borrarCliente", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrarDni),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      mostrarClientes();
    });
}

// Vamos a crear una aplicación que permita llevar el registro tanto de las habitaciones como de los clientes de un hotel. Estas son las funcionalidades que queremos que el programa cumpla:

// Diseño de la BBDD:

// Colección Clientes:
// Nombre
// Apellido
// DNI

// Colección Habitaciones (Aquí tendréis que introducir 8 habitaciones)
// Nº habitación
// Estado
// Colección reservas
// Cliente
// Habitación
// Fecha Check In
// Fecha CheckOut

// Hacer que el servidor devuelva los datos en formato JSON a peticiones a través de Postman en primer lugar. Tendremos las siguientes opciones que podremos pasar al servidor en primer lugar:

// Registrar cliente: Aquí registramos un nuevo cliente, puesto que no se puede reservar una habitación si previamente no se ha registrado al cliente. Recibiremos los datos de nombre, apellido y DNI y añadiremos los datos a la colección de Clientes.

// Editar cliente: Tendremos la opción de cambiar el nombre y el apellido de un cliente que ya está registrado en la BBDD. Tendremos una ruta en la que podremos indicar el dni de un usuario y los datos a modificar.

// Check-in: Aquí enviaremos el DNI del cliente que quiere hacer la reserva y la habitación en la que quiere hospedarse. Si el cliente no existe devolverá un mensaje que nos indique que el cliente no está registrado y por lo tanto no puede hacer una reserva. Si la habitación no está disponible, devolverá un mensaje de que la habitación no está disponible y por lo tanto no puede hacer la reserva. Si todo está correcto, añadiremos a la colección RESERVAS tanto el cliente como la habitación reservada y pondremos la habitación en la colección HABITACIONES con su estado a ocupado.

// Checkout: Crea una ruta que reciba el DNI del cliente. Si el DNI es correcto, se cambiará la reserva para indicar la fecha fin de la reserva y la habitación pasará a estado libre.

const express = require("express");
const mongodb = require("mongodb");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Conecto a la base de datos
const MongoClient = mongodb.MongoClient;
let db;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("hotel");
  }
});

// // Hacer que el servidor devuelva los datos en formato JSON a peticiones a través de Postman en primer lugar.
// //Devolver los datos de     clientes
app.get("/clientes", function (req, res) {
  db.collection("clientes")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

// //Devolver los datos de     habitaciones
app.get("/habitaciones", function (req, res) {
  db.collection("habitaciones")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

// //Devolver los datos de     reservas
app.get("/reservas", function (req, res) {
  db.collection("reservas")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

// // Registrar cliente: Aquí registramos un nuevo cliente. Recibiremos los datos de nombre, apellido y DNI y añadiremos los datos a la colección de Clientes.
app.post("/registrarCliente", function (req, res) {
  const registrarCliente = req.body;

  db.collection("clientes").insertOne(registrarCliente, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});
//Reinicio servidor y pruebo en postman

// // Editar cliente: Tendremos la opción de cambiar el nombre y el apellido de un cliente que ya está registrado en la BBDD. Tendremos una ruta en la que podremos indicar el dni de un usuario y los datos a modificar.
app.put("/editarCliente", function (req, res) {
  let cliente = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
  };
  db.collection("clientes").updateOne(
    { dni: cliente.dni },
    {
      $set: {
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
      },
    },
    function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    }
  );
});

app.delete("/borrarCliente", function (req, res) {
  let dni = req.body.dni;
  db.collection("clientes").deleteOne({ dni: dni }, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});

app.listen(3000);

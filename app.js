const express = require("express");
const pug = require("pug");
const app = express();

let perros_array = [
    { raza: "Doberman", texto: "Perro de ataque", imagen: "doberman.jpg" },
    { raza: "Dachsund", texto: "Perro de caza", imagen: "dachsund.jpg" },
    { raza: "Pastor Alemán", texto: "Perro de pastoreo", imagen: "pastoraleman.jpg" },
    { raza: "Pug", texto: "Perro de compañía", imagen: "pug.jpg" },
    { raza: "San Bernardo", texto: "Perro de rescate", imagen: "sanbernardo.jpg" }
]

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index.pug", {
        titulo: "Express y Pug",
        texto: "Perros del mundo",
        texto2: "Selecciona un perro",
        imagen: "https://curiosfera-animales.com/wp-content/uploads/2016/02/Razas-de-perros.jpg",
        perros: perros_array
    });
});

app.get("/perro/:raza", (req, res) => {
    var datosPerro = perros_array.filter((perro) => {
        if (req.params.raza == perro.raza) {
            return perro;
        }
    })[0];

    res.render("perro.pug", {
        raza: req.params.raza,
        data: datosPerro
    })
});

app.use((req, res) => {

    res.status(400);

    let error = req.originalUrl;

    res.render("404.pug", { texto: error });
});

app.listen(3000, () => {
    console.log("Servidor en el puerto 3000");
})
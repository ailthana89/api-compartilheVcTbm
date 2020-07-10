// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var cors = require("cors")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Servidor rodando na porta ${HTTP_PORT}`)
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Online" })
});


//Lista de mentores
app.get("/api/mentor", (req, res, next) => {

    var sql = "select * from mentor"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

//Cria mentor
app.post("/api/mentor", (req, res, next) => {
    var errors = []
    if (!req.body.tecnologia) {
        errors.push("tecnologia não especificado");
    }
    if (!req.body.tecnologia) {
        errors.push("tecnolog não especificado");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        nome: req.body.nome,
        tecnologia: req.body.tecnologia,
        contato: req.body.contato
    }
    var sql = 'INSERT INTO mentor (nome, tecnologia, contato) VALUES (?,?,?)'
    var params = [data.nome, data.tecnologia, data.contato]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        data.id = this.lastID;
        res.json({
            "message": "success",
            "data": data,
        })
    });
})


// Insira outros endpoints aqui!


app.use(function (req, res) {
    res.status(404).json({ "message": "url não encontrada" });
});

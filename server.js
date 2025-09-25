const express = require("express");
const cors = require("cors");

//variaveis de ambiente
const app = express();
const PORT = process.env.PORT || 9876;

//Modulos do projeto
const db = require("./database/db");
const router = require("./routes");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rotas
app.get("/", (req, res)=>{
    res.send("<h1>API RODANDO</h1>")
})
app.use(router)

db.sync({force: false}).then(()=> {
    app.listen(PORT, ()=> console.log(`Servidor rodando na porta https://localhost:${PORT}`));
}).catch(()=> console.log("Error"));
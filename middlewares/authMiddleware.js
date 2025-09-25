require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if(!authHeader) return res.json({message: "Acesso negado!"});
    if(!token) return res.json({message: "Acesso negado!"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.json({message: "Token inválido ou expirado"});
    }
}
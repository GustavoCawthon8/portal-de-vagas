require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = class UserController {
    static async register(req, res){
        const {username, email, password} = req.body;

        try{
            const userExist = await User.findOne({where: {email: email}});
            if(userExist) return res.json({message: "Email já cadastrado"});

            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({username, email, password: hashed});
            res.json({
                message: "Usuário cadastrado com sucesso",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            });
        
        }catch(err){
            res.json({message: err.message});
        }
    }

    static async login(req, res){
        const {email, password} = req.body;

        try {
            const user = await User.findOne({where: {email: email}});
            if(!user) return res.json({message: "Usuário não encontrado"});

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare) return res.json({message: "Senha invalida"});

            const token = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });

            res.json({
                message: "Login realizado com sucesso",
                token: token,
            })
            
        } catch (err) {
            res.json({message: err.message});
        }
    }

}
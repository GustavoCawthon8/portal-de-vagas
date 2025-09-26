const { where } = require('sequelize');
const Job = require('../models/Job');

module.exports = class JobController{
    static async create(req, res){
        try{
            const {titulo, descricao, emailContato} = req.body;
            const job = await Job.create({
                titulo,
                descricao,
                emailContato,
                userId: req.user.id,
            });
            res.json({message: "Vaga criada com sucesso", job});
        }catch(err){
            res.json({message: err.message});
        }
    }

    static async getAll(req, res){
        try{
            const jobs = await Job.findAll({include: ["User"]});
            res.json({jobs});
        }catch(err){
            res.json({message: err.message});
        }
    }

    static async getById(req, res){
        try{
            const {id} = req.params;
            const job = await Job.findByPk(id);
            if(!job) return res.json({message: "Vaga não encontrada"});
            res.json({job});
        }catch(err){
            res.json({message: err.message});
        }
    }

    static async getMyJobs(req, res){
        try{
            const jobs = await Job.findAll({where: {userId: req.user.id}});
            res.json({jobs});
        }catch(err){
            res.json({message: err.message});
        }
    }

    static async update(req, res){
        try{
            const {id} = req.params;
            const job = await Job.findByPk(id);
            if(!job) return res.json({message: "Vaga não encontrada"});
            if(job.userId !== req.user.id) return res.json({message: "Você não tem permissão para editar essa vaga"});
            
            const {titulo, descricao, emailContato} = req.body;
            await Job.update({titulo, descricao, emailContato}, {where: {id: id}});
            res.json({message: "Vaga atualizada com sucesso"});
        }catch(err){
            res.json({message: err.message});
        }
    }

    static async delete(req, res){
        try{
            const {id} = req.params;
            const job = await Job.findByPk(id);
            if(!job) return res.json({message: "Vaga não encontrada"});
            if(job.userId !== req.user.id) return res.json({message: "Você não tem permissão para editar essa vaga"});
            
            await Job.destroy();
            res.json({message: "Vaga deletada com sucesso"});
        }catch(err){
            res.json({message: err.message});
        }
    }
}
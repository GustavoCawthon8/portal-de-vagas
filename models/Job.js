const db = require("../database/db");
const User = require("./User");
const {DataTypes} = require("sequelize");

const Job = db.define("Jobs", {
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    emailContato:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

User.hasMany(Job, {foreignKey: "userId"});
Job.hasMany(User, {foreignKey: "userId"});

module.exports = Job;
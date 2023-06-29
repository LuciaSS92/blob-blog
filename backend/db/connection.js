const Sequelize = require("sequelize");
const path = "mysql://root@localhost:3306/blob";
const sequelize = new Sequelize(path, { operatorAliases: false });

sequelize.authenticate()
    .then(() => {
        console.log("Connected to database: blob");
    })
    .catch(err => {
        console.error("Connection error", err)
    })

module.exports = sequelize;
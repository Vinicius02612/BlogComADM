const  Sequelise  = require ('sequelize');
const connection = new Sequelise(
  'guiapress',
  'root',
  '12345',{
    host:'localhost',
    dialect:'mysql',
    timezone:"-03:00"
  }

)

module.exports = connection;
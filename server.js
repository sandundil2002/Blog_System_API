const sequelize = require("./src/config/database.js");

sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
});
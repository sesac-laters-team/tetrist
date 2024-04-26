const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
require("dotenv").config();

const db = {};

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    config
);

const roomsModel = require("./Rooms")(sequelize, Sequelize);
const usersModel = require("./Users")(sequelize, Sequelize);
const productsModel = require("./Products")(sequelize, Sequelize);
const userPurchaseModel = require("./UserPurchase")(sequelize, Sequelize);

// 테이블 관계 설정

// users <> product_id
usersModel.belongsToMany(productsModel, {
    through: userPurchaseModel,
    foreignKey: "user_id",
});
productsModel.belongsToMany(usersModel, {
    through: userPurchaseModel,
    foreignKey: "product_id",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.roomsModel = roomsModel;
db.usersModel = usersModel;
db.productsModel = productsModel;
db.userPurchaseModel = userPurchaseModel;

module.exports = db;

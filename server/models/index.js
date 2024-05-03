const Sequelize = require("sequelize");
require("dotenv").config();

// 분기 처리
// NODE_ENV 값이 존재할 경우 (npm run dev or npm start)
// 그냥 nodemon 으로 실행할 경우 node_env 값이 비어 있을 경우가 있으므로 분기처리 해줘야함
let config;
if (process.env.NODE_ENV) {
    config = require(__dirname + "/../config/config.js")[process.env.NODE_ENV];
} else {
    config = require(__dirname + "/../config/config.js")["development"];
}

const db = {};

const sequelize = new Sequelize(
    config.databse,
    config.username,
    config.password,
    config
);

const roomsModel = require("./Rooms")(sequelize, Sequelize);
const usersModel = require("./Users")(sequelize, Sequelize);
const productsModel = require("./Products")(sequelize, Sequelize);
const userPurchaseModel = require("./UserPurchase")(sequelize, Sequelize);

// 테이블 관계 설정

// users > rooms
usersModel.hasMany(roomsModel, {
    foreignKey: "user_id",
    allowNull: false,
});
roomsModel.belongsTo(usersModel, {
    foreignKey: "user_id",
    allowNull: false,
});

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

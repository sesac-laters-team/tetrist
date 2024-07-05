const dotenv = require("dotenv");
dotenv.config();

// local 기준
const development = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
    }, // 날짜 표기 방식을 연-월-일 시:분:초 만 출력되도록 변경
    timezone: "+09:00", // 표준시 보정
};
// rds 기준
const production = {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    host: process.env.RDS_HOST,
    dialect: "mysql",
    dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
    },
    timezone: "+09:00",
};

module.exports = { development, production };

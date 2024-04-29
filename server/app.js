const express = require("express");
const app = express();
const session = require("express-session");
const router = require("./routes/router");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models");
const http = require("http");
const server = http.createServer(app);
const socketHandler = require("./sockets/index");
const cors = require("cors");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
socketHandler(server);

// 세션 설정
const sessionConfig = {
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        // maxAge: 1000 * 60 * 60,
        signed: true,
    },
};
app.use(session(sessionConfig));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// 라우터 설정
app.use("/api-server", router);
app.use("/api-server/auth", authRouter);

// swagger
const { swaggerUi, swaggerSpec } = require("./routes/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 시퀄라이즈
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("db connected");
        });
    })
    .catch((err) => {
        console.log(err);
    });

// 소켓 서버 설정
server.listen(process.env.PORT_SOCKET, () => {
    console.log("socket server open");
});

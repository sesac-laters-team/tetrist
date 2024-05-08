const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "스웨거를 활용한 Express API",
            version: "1.0.0",
            description: "스웨거를 사용한 API 문서화",
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "개발 서버",
            },
        ],
        components: {
            schemas: {
                Users: {
                    type: "object",
                    properties: {
                        user_id: { type: "integer" },
                        email: { type: "string", format: "email" },
                        password: { type: "string" },
                        nickname: { type: "string" },
                        win: { type: "integer" },
                        lose: { type: "integer" },
                        rating: { type: "integer" },
                    },
                },
                Rooms: {
                    type: "object",
                    properties: {
                        room_id: { type: "integer" },
                        r_name: { type: "string" },
                        r_password: { type: "string" },
                        r_status: { type: "boolean" },
                        guest_id: { type: "integer" },
                        user_id: {
                            type: "integer",
                            description: "방을 만든 유저의 user_id",
                        },
                    },
                },
                Products: {
                    type: "object",
                    properties: {
                        product_id: { type: "integer" },
                        p_name: { type: "string" },
                        p_type: { type: "string" },
                        p_img: { type: "string" },
                        p_price: { type: "integer" },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };

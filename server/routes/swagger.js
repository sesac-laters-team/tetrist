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
                    properties: {},
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };

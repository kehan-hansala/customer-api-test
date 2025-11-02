const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'My Customer CRUD Description',
        },
        servers: [
            {
                url:'http://localhost:3000'
            }
        ]
    },
    apis: [path.join(__dirname, './routes/*.js')],
};
const specs = swaggerJsDoc(options);
function setupSwagger(app){
    app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(specs));
}
module.exports = setupSwagger;
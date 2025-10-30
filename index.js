const express = require('express');
require('dotenv').config();
const customerRoutes = require('./routes/CustomerRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT | 3000;



app.get('/', (req,resp)=>{
    resp.status(200).json({'message':'Connected...'});
})

app.listen(PORT, ()=>{
    console.log(`Server Started and Running on port ${PORT}`)
});

app.use('/api/v1/customers', customerRoutes);
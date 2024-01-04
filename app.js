const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const redis = require('redis');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const supportRoutes = require('./routes/supportRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const bankAccountRoutes = require('./routes/bankAccountRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/eWalletDb';

app.use(bodyParser.json());
app.use(userRoutes);
app.use(accountRoutes);
app.use(supportRoutes);
app.use(transactionRoutes);
app.use(bankAccountRoutes);
app.use('/apidoc', express.static('apidoc'));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Mongodb connection success.`);
    })
    .catch((error) => {
        console.log(`Error while connecting to mongo :: ${error}`);
    })

require('./libs/redis');

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});

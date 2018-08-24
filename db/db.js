// Set-up db connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/marketplace', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
    console.log(err, ' mongoose failed to connect');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});
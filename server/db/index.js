const mongoose = require('mongoose');
const { mongoUri } = require('../config');

module.exports = async function connect() {
    try {
        return mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (e) {
        console.error('could not connect to mongo');
        process.exit(1);
    }
};

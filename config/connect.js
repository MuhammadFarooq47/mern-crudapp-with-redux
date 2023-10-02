const mongoose = require('mongoose');

const connect = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://mfarooqh7:ifQO3EnXfI7EOMpB@practicecluster.1ib2wkm.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
console.log(`Mongoose Connected`);
    } catch (e) {
        console.log(`Server encountered an Error ${e.message}`);
    }
}

module.exports = connect;

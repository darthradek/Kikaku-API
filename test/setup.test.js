var mongoose = require('mongoose');

after((done) => {
    for (var collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteMany(function () { });
    }
    done();
});
const User = require('../build/models/user');

// //clean up the database before and after each test
// beforeEach((done) => {
//     User.collection.drop();
//     done();
// });

afterEach((done) => {
    User.deleteMany({}, function (err) { });
    done();
});

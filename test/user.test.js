const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../build/server');
const should = chai.should();

chai.use(chaiHttp);


// describe('User workflow tests', () => {

//     it('should register + login a user, create product and verify 1 in DB', (done) => {
//         //SECTION_1 Register new user
//         let user =
//         {
//             username: "todo",
//             email: "todo@gmail.com",
//             password: "123456"
//         }

//         chai.request(server)
//             .post('/user/register')
//             .send(user)
//             .end((err, res) => {

//                 //SECTION_2  Asserts
//                 expect(res.status).to.be.equal(201);
//                 expect(res.body).to.be.a('object');
//                 done();

//                 //SECTION_3 Login the user
//                 chai.request(server)
//                     .post('/user/login')
//                     .send({
//                         "email": "todo@gmail.com",
//                         "password": "123456"
//                     })
//                     .end((err, res) => {
//                         //NOTE: Asserts                        
//                         expect(res.status).to.be.equal(200);
//                     });
//             });
//     });
// });

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../build/server');
const should = chai.should();

chai.use(chaiHttp);

describe('User workflow tests', () => {

    it('Should register new user', (done) => {
        //SECTION_1 Register new user
        let user =
        {
            username: "test-user",
            email: "test-user@gmail.com",
            password: "123456"
        }

        chai.request(server)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                done();
            });
    });

    it('Should log in user into newly created account', (done) => {
        let userLogin =
        {
            email: "test-user@gmail.com",
            password: "123456"
        }
        chai.request(server)
            .post('/api/users/login')
            .send(userLogin)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});
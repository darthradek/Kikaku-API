const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../build/server');
const should = chai.should();
const Product = require('../build/models/user')

chai.use(chaiHttp);

describe('User workflow tests', () => {

    it('Should register + login user & authenticate him with JWT', (done) => {
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

                //SECTION_2  Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                done();

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
                    })

            });


    });
});
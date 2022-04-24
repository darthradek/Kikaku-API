const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../build/server.js');

chai.use(chaiHttp);

describe('First Test Collection', function () {
    it('should test two values', function () {
        let expectedVal = 10;
        let actualVal = 10;

        expect(actualVal).to.be.equal(expectedVal)
    })

    it('Test welcome route!!', (done) => {
        chai.request(server)
            .get('/welcome')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                const actualVal = res.body.message;
                expect(actualVal).to.be.equal('Welcome to Kikaku API')
                done();
            });
    });
})
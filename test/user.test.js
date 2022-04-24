const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../build/server');
const should = chai.should();

chai.use(chaiHttp);

describe('First Test Collection', function () {
    it('should test two values', () => {
        let expectedVal = 10;
        let actualVal = 10;

        expect(actualVal).to.be.equal(expectedVal)
    });

    it('test default API welcome route...', (done) => {
        chai.request(server)
            .get('/welcome')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                const actualVal = res.body.message;
                expect(actualVal).to.be.equal('Welcome to Kikaku API');
                done();
            });
    });
})
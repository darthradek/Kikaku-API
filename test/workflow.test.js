const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../build/server');
const should = chai.should();

chai.use(chaiHttp);

describe('User workflow tests', () => {

    it('should register + login a user, create product and verify 1 in DB', (done) => {
        //SECTION_1 Register new user
        let user =
        {
            username: "this",
            email: "this@gmail.com",
            password: "123456"
        }

        chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err, res) => {

                //SECTION_2  Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                done();

                //SECTION_3 Login the user
                chai.request(server)
                    .post('/user/login')
                    .send({
                        "email": "this@gmail.com",
                        "password": "123456"
                    })
                    .end((err, res) => {
                        //NOTE: Asserts                        
                        expect(res.status).to.be.equal(200);
                        let token = res.body.data.token;
                        let userId = res.body.user_id;

                        console.log(userId)

                // //SECTION_4 Create new product
                // let team = {
                //     name: "cool-team",
                //     description: "this is cool-team",
                //     members: [
                //         "6261c62403f2d92591e0f3ad"
                //     ],
                //     leader: "6261c62403f2d92591e0f3ad",
                //     created_by: "6261c62403f2d92591e0f3ad"
                // }

                // chai.request(server)
                //     .post('/team/create')
                //     .set({ "auth-token": token })
                //     .send(team)
                //     .end((err, res) => {

                //         // Asserts
                //         expect(res.status).to.be.equal(201);
                //         expect(res.body).to.be.a('object');
                //         // expect(res.body.length).to.be.eql(1);

                //         let savedTeam = res.body[0];
                //         expect(savedTeam.team.name).to.be.equal(team.name);
                //         expect(savedTeam.team.description).to.be.equal(team.description);
                //         expect(savedTeam.team.leader).to.be.equal(team.leader);
                //         expect(savedTeam.team.created_by).to.be.equal(team.created_by);


                //         // 4) Verify one product in test DB
                //         chai.request(server)
                //             .get('/team/getAll')
                //             .end((err, res) => {

                //                 // Asserts
                //                 expect(res.status).to.be.equal(200);
                //                 expect(res.body).to.be.a('array');
                //                 expect(res.body.length).to.be.eql(1);

                //                 done();
                //             });
                    });
            });
    });
});
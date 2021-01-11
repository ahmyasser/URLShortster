const Url = require('../models/url');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();




chai.use(chaiHttp);

describe('Urls', () => {
    beforeEach((done) => {
        Url.deleteMany({}, (err) => {
           done();
        });
    });

  describe('/GET url', () => {
      it('it should GET all the urls', (done) => {
        chai.request(server)
            .get('/url')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
          });
        });
  
  describe('/POST url', () => {
      it('it should not POST a url without full field', (done) => {
        let url = {
          short: "the100",
          }
      chai.request(server)
        .post('/url')
        .send(url)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("please enter full url");
          done();
        });
      });
      it('it should POST a url with auto generated short', (done) => {
        let url = {
        full: 'https://www.google.com/'    
        }
          chai.request(server)
          .post('/url')
          .send(url)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('full');
                res.body.should.have.property('short').to.have.lengthOf(6);
                res.body.should.have.property('clicks');
                res.body.should.have.property('createdAt');
            done();
          });
        });
      it('it should not POST a url with unvalid short url', (done) => {
        let url = {
          full: 'https://www.google.com/',    
          short: 'gog'    
        }
          chai.request(server)
          .post('/url')
          .send(url)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql("invalid short url, short URl must be a-z, A-Z, 1-9 and at least 4 digit long")
                done();
          });
        });
      });

      describe('/GET/:shorturl url', () => {
        it('it should GET a url by the given shortUrl', (done) => {
            let url = new Url({ full: 'https://www.google.com/', short: "gogle"});
            url.save((err, url) => {
                chai.request(server)
              .get(`/${url.short}`)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('full');
                done();
              });
            });       
        });    
     });
     describe('/GET/:shorturl/stats url', () => {
      it('it should GET a url stats by the given shortUrl', (done) => {
          let url = new Url({ full: 'https://www.google.com/', short: "gogle", lastAccessed:Date.now()});
          url.save((err, url) => {
              chai.request(server)
            .get(`/${url.short}/stats`)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('full');
                  res.body.should.have.property('short');
                  res.body.should.have.property('createdAt');
                  res.body.should.have.property('lastAccessed');
                  res.body.should.have.property('clicks')
                  res.body.should.have.property('_id');
              done();
            });
          });
        });
      });
  });
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index")

var createdID;

// Assertion Style 
chai.should();

chai.use(chaiHttp);

describe('Cards API', () => {
  // Test the GET Request
  describe("GET /api/v1/clashroyale/cards", () => {
    it("It should GET all the cards", (done) => {
      chai.request(server)
        .get("/api/v1/clashroyale/cards")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        })
    })

    it("It should GET any card", (done) => {
      chai.request(server)
        .get("/api/v1/clashroyale/card")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })
  })

  // Test the GET (By ID) Request
  describe('GET /api/v1/clashroyale/cards/:id', () => {
    it("It should GET a card by ID", (done) => {
      const cardID = "6075341f481f5edd50fa13e3";
      chai.request(server)
        .get("/api/v1/clashroyale/cards/" + cardID)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('id');
          response.body.should.have.property('img');
          response.body.should.have.property('nombre');
          response.body.should.have.property('calidad');
          response.body.should.have.property('tipoCarta');
          response.body.should.have.property('vida');
          response.body.should.have.property('danio');
          response.body.should.have.property('velocidad');
          done();
        })
    })

    it("It should not GET a card", (done) => {
      const cardID = "6075341f481f5edd50fa13e4";
      chai.request(server)
        .get("/api/v1/clashroyale/cards/" + cardID)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq('{"status":false,"message":"Carta no encontrada"}')
          done();
        })
    })

    it("It should NOT PATCH a new Card. (Can't parse to Mongo ID)", (done) => {
      chai.request(server)
        .get("/api/v1/clashroyale/cards/1")
        .end((err, response) => {
          response.should.have.status(500);
          done();
        })
    })
  })

  // Test the POST Request
  describe ('POST /api/v1/clashroyale/cards/new', () => {
    it("It should POST a new Card", (done) => {
      const card = {
        "id": 10,
        "img": "",
        "nombre": "Leñador",
        "calidad": "Legendaria",
        "tipoCarta": "Tropa",
        "vida": 2800,
        "danio": 300,
        "velocidad": "Alta"
      }
      chai.request(server)
        .post("/api/v1/clashroyale/cards/new")
        .send(card)
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.a('object');
          createdID = response.body.cartaID;
          done();
        })
    })

    it("It should NOT POST a new Card. (nombre is a required property)", (done) => {
      const badCart = {
        "id": 10,
        "img": "",
        "calidad": "Legendaria",
        "tipoCarta": "Tropa",
        "vida": 2800,
        "danio": 300,
        "velocidad": "Alta"
      }
      chai.request(server)
        .post("/api/v1/clashroyale/cards/new")
        .send(badCart)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        })
    })
  })

  // Test the PATCH Request
  describe ('PATCH /api/v1/clashroyale/cards/:id', () => {

    const cardUpdated = {
      "id": 11,
      "img": "",
      "nombre": "LEÑADOR",
      "calidad": "Legendaria",
      "tipoCarta": "Tropa",
      "vida": 2800,
      "danio": 300,
      "velocidad": "Alta"
    }

    it("It should PATCH a Card", (done) => {
      chai.request(server)
        .patch("/api/v1/clashroyale/cards/" + createdID)
        .send(cardUpdated)
        .end((err, response) => {
          response.should.have.status(204);
          response.should.be.a('object');
          done();
        })
    })

    it("It should NOT PATCH a Card. (ID not existing)", (done) => {
      chai.request(server)
        .patch("/api/v1/clashroyale/cards/607a6ec827b4b0477bef62c1")
        .send(cardUpdated)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })

    it("It should NOT PATCH a Card. (Can't parse to Mongo ID)", (done) => {
      chai.request(server)
        .patch("/api/v1/clashroyale/cards/1")
        .send(cardUpdated)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        })
    })
  })

  // Test de DELETE Request
  describe ('DELETE /api/v1/clashroyale/cards/:id', () => {
    it("It should DELETE a Card", (done) => {
      chai.request(server)
        .delete("/api/v1/clashroyale/cards/" + createdID)
        .end((err, response) => {
          response.should.have.status(204);
          response.should.be.a('object');
          done();
        })
    })

    it("It should NOT DELETE a Card. (ID not existing)", (done) => {
      chai.request(server)
        .delete("/api/v1/clashroyale/cards/607a6ec827b4b0477bef62c1")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })

    it("It should NOT DELETE a Card. (Can't parse to Mongo ID)", (done) => {
      chai.request(server)
        .delete("/api/v1/clashroyale/cards/1")
        .end((err, response) => {
          response.should.have.status(500);
          done();
        })
    })
  })
})
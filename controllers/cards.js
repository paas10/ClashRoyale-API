const redis = require('redis');
const REDIS_PORT = 6379;
const redisClient = redis.createClient({
  port: REDIS_PORT,
  host: 'localhost'
});


const Card = require('../models/card');

CardController = {
  getCards: async (req, res) => {
    try {
      console.log('Recuperando Data...')
      setTimeout(async () => {
        const cards = await Card.find()
        
        // Set data to redis
        redisClient.setex('cartas', 3600, JSON.stringify(cards));
        
        res.status(200).send(cards);
      }, 5000);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  cache: async (req, res, next) => {
    redisClient.get('cartas', (err, data) => {
      if(err) throw err;
  
      if(data != null) {
        res.send(data)
      } else {
        next();
      }
    })
  },
  
  getCardByID: async (req, res) => {
    // console.log(req.params)

    try {
      card = await Card.findById(req.params.id);
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).json({
          status: false,
          message: "Carta no encontrada",
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  createCard: async (req, res) => {
    if (req.body) {
      const card = new Card(req.body);

      try {
        const newCard = await card.save();

        // Limpio la caché para recuperar los datos reales
        redisClient.del('cartas');

        res.status(201).json({
          status: true,
          message: "Carta ingresada correctamente",
          cartaID: newCard._id
        });
      } catch (err) {
        // 400: Error Data Fail
        res.status(400).json({ message: err.message });
      }
    } else {
      res.status(500).json({
        status: false,
        message: "No se ha recibido una carta que insertar",
      });
    }
  },
  
  updateCard: async (req, res) => {
    const { id, img, nombre, calidad, tipoCarta, vida, danio, velocidad } = req.body;
  
    try {
      card = await Card.findById(req.params.id);
      if (card) {
        card.id = id;
        card.img = img;
        card.nombre = nombre;
        card.calidad = calidad;
        card.tipoCarta = tipoCarta;
        card.vida = vida;
        card.danio = danio;
        card.velocidad = velocidad;

        await card.save();

        // Limpio la caché para recuperar los datos reales
        redisClient.del('cartas');
        
        res.status(204).json({
          status: true,
          message: "Carta actualizada correctamente",
        });

      } else {
        res.status(404).json({
          status: false,
          message: "Carta no encontrada",
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  deleteCard: async (req, res) => {
    const { id } = req.params;
    
    try {
      card = await Card.findById(req.params.id);
      if (card) {
        card.remove();

        // Limpio la caché para recuperar los datos reales
        redisClient.del('cartas');

        res.status(204).json({
          status: true,
          message: "Carta eliminada correctamente",
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Carta no encontrada",
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = CardController;
let cards = [
  {
    id: 1,
    img:
      "https://i.pinimg.com/originals/fc/0c/42/fc0c42ee756186e4c700f2df7f9cb4da.png",
    nombre: "Príncipe",
    calidad: "Épica",
    tipoCarta: "Tropa",
    vida: 2422,
    danio: 472,
    velocidad: "Media",
  },
  {
    id: 2,
    img:
      "https://i.pinimg.com/originals/22/cc/53/22cc5316986505a09b75d1bd8176e857.png",
    nombre: "P.E.K.K.A.",
    calidad: "Épica",
    tipoCarta: "Tropa",
    vida: 5018,
    danio: 984,
    velocidad: "Alta",
  },
  {
    id: 3,
    img:
      "https://i.pinimg.com/originals/d5/36/80/d53680705aaf35791407cf61cab41eb0.png",
    nombre: "Valquiria",
    calidad: "Especial",
    tipoCarta: "Tropa",
    vida: 1643,
    danio: 293,
    velocidad: "Media",
  },
];

export const getCards = (req, res) => {
  // console.log(cards)
  res.status(200).send(cards);
};

export const getCardByID = (req, res) => {
  // console.log(req.params)
  const id = req.params.id;

  const card = cards.filter((element) => element.id == id);
  if (card.length > 0) {
    res.status(200).send(card);
  } else {
    res.status(404).json({
      status: false,
      message: "Carta no encontrada",
    });
  }
};

export const createCard = (req, res) => {
  if (req.body.id) {
    cards.push(req.body);

    res.status(201).json({
      status: true,
      message: "Carta ingresada correctamente",
    });
  } else {
    res.status(500).json({
      status: false,
      message: "No se ha recibido una carta que insertar",
    });
  }
};

export const updateCard = (req, res) => {
  const { id } = req.params;
  const { img, nombre, calidad, tipoCarta, vida, danio, velocidad } = req.body;

  const card = cards.find((element) => element.id == id);

  if (card) {
    if (img) card.img = img;
    if (nombre) card.nombre = nombre;
    if (calidad) card.calidad = calidad;
    if (tipoCarta) card.tipoCarta = tipoCarta;
    if (vida) card.vida = vida;
    if (danio) card.danio = danio;
    if (velocidad) card.velocidad = velocidad;

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
};

export const deleteCard = (req, res) => {
  const { id } = req.params;

  const cardID = cards.findIndex((element) => element.id == id);
  // console.log('INDEX ', cardID);

  if (cardID >= 0) {
    cards.splice(cardID, 1);
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
};
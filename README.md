# ClashRoyale-API
Backend en NodeJS para el sitio Web ClashRoyale

## LINK DE REQUESTS EN POSTMAN https://www.getpostman.com/collections/2e12bba3f05908f20eb3

### GET
- Recuperación de todas las cartas http://localhost:3001/api/v1/clashroyale/cards
- Recuperación de cartas a través de su ID http://localhost:3001/api/v1/clashroyale/cards/2

### POST
Creación de nuevas cartas http://localhost:3001/api/v1/clashroyale/cards/new
Ejemplo de JSON a ingresar enviado por Raw (body)
    {
        "id": 4,
        "img": "https://i.pinimg.com/originals/dc/0f/63/dc0f63a45e84b4c9c7fd3ae74440824e.png",
        "nombre": "Bruja Noctura",
        "calidad": "Legendaria",
        "tipoCarta": "Tropa",
        "vida": 3000,
        "danio": 192,
        "velocidad": "Media"
    }

### PATCH
Actualización de una carta a través de su ID http://localhost:3001/api/v1/clashroyale/cards/1
Ejemplo de JSON a ingresar enviado por Raw (body)
    {
        "danio":474
    }

### DELETE
Eliminación de una carta a través de su ID http://localhost:3001/api/v1/clashroyale/cards/2
const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Importez votre fichier JSON Swagger ici
const port = 3000;
const version = 'v1';
const router = require('./routes/routes');
const app = express();
const Music = require('./models/music');
const connexion = require('./DB/dbconnect');


const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './db/database.sqlite',
    database: './db/database.sqlite',
  });

  connexion.sync().then(() => {
    console.log('Database synchronised.');
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  });
  });
  

 (async function testConnection() {
     try {
      await sequelize.authenticate();
       console.log('Connection has been established successfully.');
     } catch (error) {
       console.error('Unable to connect to the database:', error);
    }
  })();
  

  (async () => {
    await Music.sync(/*{ force: true }*/).then(() => {
      console.log('Models synchronized successfully.');
    }).catch(e => {
      console.log(e);
    });
    // const data = require('./models/data.json');
    // data.forEach(async (music) => {
    //     await Music.create({cover: music.cover,sound: music.sound,title: music.title,category: music.category});
        
    // });
  })();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/api/${version}`, router);
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
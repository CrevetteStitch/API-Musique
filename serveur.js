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


 (async function testConnection() {
     try {
      await sequelize.authenticate();
       console.log('Connection has been established successfully.');
     } catch (error) {
       console.error('Unable to connect to the database:', error);
    }
  })();
  

  (async () => {
    await Music.sync({ force: true }).then(() => {
      console.log('Models synchronized successfully.');
    }).catch(e => {
      console.log(e);
    });
    const music1 = await Music.create({ cover: "harry_styles-watermelon_sugar.jpg", sound: "Harry_Styles-Watermelon_Sugar.mp3", title: "Harry Styles - Watermelon Sugar", category: "pop"});
    const music2 = await Music.create({ cover: "THOMAS_styles-watermelon_sugar.jpg", sound: "Harry_Styles-Watermelon_Sugar.mp3", title: "Harry Styles - Watermelon Sugar", category: "pop"});
    //console.log(await Music.findAll());
  })();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/api/${version}`, router);
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

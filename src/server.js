require('dotenv').config();
const app = require('./api');

const { PORT } = process.env;

app.get('/', (_request, response) => {
  response.send();
});

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

module.exports = server;

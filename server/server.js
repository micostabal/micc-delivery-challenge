const { app } = require("./api");

const HTTP_PORT = 3001

app.listen(HTTP_PORT, () => {
  console.log(`😃 Delivery System 😃 Server running on port ${HTTP_PORT} 🚀🚀`)
});
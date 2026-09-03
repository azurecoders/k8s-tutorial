const app = require("./app");

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "MyApp";
const ENV = process.env.ENV || "development";

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on :${PORT} [${ENV}]`);
});

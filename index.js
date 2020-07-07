require("dotenv").config();
const server = require("./api/server");

const PORT = process.env.PORT || 4000;

server.listen(port, () => console.log(`server running in port ${PORT}`));

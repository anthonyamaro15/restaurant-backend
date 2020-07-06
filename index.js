require("dotenv").config();
const server = require("./api/server");

const port = process.env.port || 4000;

server.listen(port, () => console.log(`server running in port ${port}`));

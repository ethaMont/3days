server = require("./src/server/server");
router = require("./src/server/router");
express = require('express')
path = require('path')
app = express()
app.set('port', process.env.PORT || 3000)

server.start(app);
router.route(app);

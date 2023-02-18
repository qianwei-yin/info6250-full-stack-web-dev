const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const PORT = 3000;

const app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});

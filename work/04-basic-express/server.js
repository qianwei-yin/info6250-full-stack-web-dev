const express = require('express');
const app = express();
const PORT = 3000;

const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require('./chat-web'); // "chat-web" holds the templates for the generated HTML

app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.send(chatWeb.chatPage(chat));
});

// Below includes an example of pulling fields from a POST request body
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
	// destructuring and renaming
	const { username: sender, text } = req.body; // You'll need to add something!

	// Can use CSS to easily handle the situation of no input
	// if (!text) {
	// }

	// Add a message object to messages array
	chat.addMessage({ sender, text });

	// With redirect, app will GET '/' again
	res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

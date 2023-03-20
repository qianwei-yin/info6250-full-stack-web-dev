messages = [];

function addMessage(username, message) {
	const timestamp = Date.now();
	messages.push({
		timestamp,
		username,
		message,
	});
}

function getMessages() {
	return messages;
}

module.exports = {
	getMessages,
	addMessage,
};

const chatWeb = {
	chatPage: function (chat) {
		// Fill in/modify anything below!
		return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="./images/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="./style.css" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=recia@700,500,600,400&f[]=erode@700,500,600,400&display=swap"
          rel="stylesheet"
        />

        <title>MeowChat | Make Chat Simpler</title>
      </head>

      <body>
        <section class="chat-app">
          ${chatWeb.getUserList(chat)}
          ${chatWeb.getMessageList(chat)}
          ${chatWeb.getOutgoing(chat)}
        </section>

        <footer class="footer">copyright &copy; 2023 MeowChat. All rights reserved.</footer>
      </body>
    </html>
  `;
	},

	getMessageList: function (chat) {
		return (
			`<ol class="messages">` +
			// Generate the HTML for the list of messages
			chat.messages
				.map((message) => {
					return `
        <div class="message">
          <div class="message__sender">
            <img class="avatar sender__avatar" 
            alt="avatar of ${message.sender}" 
            src="./images/avatar-${message.sender.toLowerCase()}.jpg" 
            />
            <span class="sender__username">${message.sender}</span>
          </div>
          <p class="message__text">${message.text}</p>
        </div>
        `;
				})
				.join('') +
			`</ol>`
		);
	},

	getUserList: function (chat) {
		return (
			`<ul class="users">` +
			Object.values(chat.users)
				.map(
					(user) => `
      <li>
        <div class="user">
          <img class="avatar user__avatar" 
            alt="avatar of ${user}" 
            src="./images/avatar-${user.toLowerCase()}.jpg" 
            />
          <span class="username">${user}</span>
        </div>
      </li>
    `
				)
				.join('') +
			`</ul>`
		);
	},

	getOutgoing: function () {
		// Generate the HTML for a form to send a message
		// The 'required' attribute make sure user cannot send a blank text
		// Use 'username' but not 'sender' as the name attribute of the 2nd input field, for the convenience of adding login function in the future (sender will automatically be the loggedin user)
		return `
    <form action="/chat" method="post" class="send-form">
      <input placeholder="Enter message to send" type="text" class="send-form__input--text" name="text" required />
      <input type="hidden" class="send-form__input--username" value="Bao" name="username" />
      <button class="send-form__btn" type="submit">Send</button>
    </form>
    `;
	},
};

module.exports = chatWeb;

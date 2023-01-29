const users = { // Yes, an object!  Keep it as one
  "Amit": "Amit", // The keys let you check to see if the user is logged in
  "Bao": "Bao",  // the values don't really matter, here we reuse the username, but it could be `true`
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

// Below uses destrucuring
function addMessage({ sender, text }) { // Leave this as `sender` - I want to see you solve the name disagreement
  // Fill in!
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;


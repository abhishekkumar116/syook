const crypto = require("crypto");
const fs = require("fs");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function encryptMessage(message, passkey) {
  // Implement encryption using crypto library
}

function generateDataStream(data) {
  const numMessages = getRandomInt(49, 499);
  const messages = [];

  for (let i = 0; i < numMessages; i++) {
    const randomIndex = getRandomInt(0, data.length - 1);
    const name = data[randomIndex].name;
    const origin = data[randomIndex].origin;
    const destination = data[randomIndex].destination;
    const secretKey = crypto
      .createHash("sha256")
      .update(name + origin + destination)
      .digest("hex");
    const originalMessage = {
      name,
      origin,
      destination,
      secret_key: secretKey,
    };
    const encryptedMessage = encryptMessage(
      JSON.stringify(originalMessage),
      "your-passkey"
    );

    messages.push(encryptedMessage);
  }

  return messages.join("|");
}

module.exports = generateDataStream;

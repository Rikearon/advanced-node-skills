const Keygrip = require('keygrip');
const keys = require('../../config/keys');

const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
  // My way of setting the desired object to base 64
  //const session = btoa(JSON.stringify({ passport: { user: user._id.toString() } }));

  // Instructor's way of converting the object to base 64
  const sessionObject = {
    passport: {
      user: user._id.toString(),
    },
  };
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  // They're totally equivalent

  const sig = keygrip.sign('session=' + session);

  return { session, sig };
};

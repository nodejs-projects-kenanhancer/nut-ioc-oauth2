const { nanoid, customAlphabet } = require('nanoid');
const clientIDGenerator = customAlphabet('1234567890abcdefghijklmnopqrstuvwyz', 32);
const clientSecretGenerator = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz', 64);
const authorizeCodeGenerator = customAlphabet('1234567890abcdefghijklmnopqrstuvwyz', 64);

module.exports.Service = () => ({
    uuid: nanoid,
    clientID: clientIDGenerator,
    clientSecret: clientSecretGenerator,
    authorizeCode: authorizeCodeGenerator
});

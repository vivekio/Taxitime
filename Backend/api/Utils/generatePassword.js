const generator = require("generate-password");

const generatePassword = () => {
    return generator.generate({
        length: 8,
        numbers: true,
        uppercase: true,
        lowercase: true,
        strict: true,
    });
};

module.exports = generatePassword;

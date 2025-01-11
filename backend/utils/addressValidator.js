function isValidAddress(address) {
    if (address.length < 5) return false;

    return true;
};

module.exports = isValidAddress
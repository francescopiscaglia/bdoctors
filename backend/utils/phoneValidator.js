// La regex permette il "+" solo all'inizio, seguito da numeri
const phoneRegex = /^\+?[0-9]+$/;

function isValidPhoneNumber(phoneNumber) {

    if (!phoneRegex.test(phoneNumber)) {
        return false; // Contiene caratteri non validi o "+" non è all'inizio
    }

    // Se il "+" è presente, deve essere solo all'inizio
    if (phoneNumber.includes("+") && phoneNumber.indexOf("+") !== 0) {
        return false; // Se il "+" non è all'inizio
    }

    return true;
};

module.exports = isValidPhoneNumber

class Utils {

    static parseDate(date) {
        const minutes = (parseInt(date.getUTCMinutes()) > 9)
            ? date.getUTCMinutes()
            : `0${date.getUTCMinutes()}`;
        return `${date.getUTCDate()}. ${date.getUTCMonth()} ${date.getUTCHours()}:${minutes}`;
    }
}

module.exports = Utils;
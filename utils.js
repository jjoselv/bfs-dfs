function convertMiliseconds(miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

    // milis = (Math.floor(miliseconds / 1000) - miliseconds / 1000) * 1000;
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));

    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    switch (format) {
        case 's':
            return total_seconds;
        case 'm':
            return total_minutes;
        case 'h':
            return total_hours;
        case 'd':
            return days;
        // case 'milis':
        //     return milis;
        default:
            return {
                d: days,
                h: hours,
                m: minutes,
                s: seconds,
                // milis: milis
            };
    }
};

function format(data) {
    return `${data.d ? `${data.d} days, ` : ''}${data.h ? `${data.h} hours, ` : ''}${data.m ? `${data.m} minutes, ` : ''}${data.s ? `${data.s} seconds, ` : ''}${data.milis ? `${data.milis} miliseconds, ` : ''}`;
}

exports.convertMiliseconds = convertMiliseconds;
exports.format = format;
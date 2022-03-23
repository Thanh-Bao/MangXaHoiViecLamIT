import moment from 'moment-timezone';

export function timeDifference(timeString) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let current = new Date();

    const myTime = moment(timeString);
    const year = myTime.year();
    const month = myTime.month();
    const day = myTime.date();
    const hour = myTime.hour();
    const minute = myTime.minute();
    const second = myTime.second();
    const millisecond = myTime.millisecond();
    let previous = new Date(year, month, day, hour, minute, second, millisecond);

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return ' ngây bây giờ';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' phút trước';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' giờ trước';
    }

    else if (elapsed < msPerMonth) {
        return + Math.round(elapsed / msPerDay) + ' ngày trước';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' tháng trước';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' năm trước';
    }
}

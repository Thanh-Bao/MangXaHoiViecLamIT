export function roundToNearest5(x) {
    return Math.floor(x / 5) * 5;
}

export function formatSpacingNumber(number) {
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    return number.toString().replace(regex, '.');
}

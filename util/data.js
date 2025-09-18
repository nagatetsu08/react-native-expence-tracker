export function getFormatdate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDate(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
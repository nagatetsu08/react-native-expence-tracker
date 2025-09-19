export function getFormatdate(date) {
    // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return date.toISOString().slice(0, 10); // YYYY-MM-DD形式に簡単に変換してくれる。
}

export function getDateMinusDate(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
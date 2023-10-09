export function formatToEn(date: string) {
    const [day, month, year]: string[] = date.split('/');
    return year + '-' + month + '-' + day;
}

export function formatToPtBr(date: string) {
    const [year, month, day]: string[] = date.split('-');
    return day + '/' + month + '/' + year;
}
export const getFullDate = (time) => {
    let day = new Date(time).getDate();
    let month = new Date(time).getMonth() + 1;
    let year = new Date(time).getFullYear()
    let fullDate = `${day}/${month}/${year}`;
    return fullDate;
}
export const getFullYesterDayDate = (time) => {
    let day = new Date(time).getDate() - 1;
    let month = new Date(time).getMonth() + 1;
    let year = new Date(time).getFullYear()
    let fullDate = `${day}/${month}/${year}`;
    return fullDate;
}
export const validDate = (time) => {
    let day = new Date(time).getDate()
    let month = new Date(time).getMonth();
    return month > new Date().getMonth() || month === new Date().getMonth() && day > new Date().getDate();
}
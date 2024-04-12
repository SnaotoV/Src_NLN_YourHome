export const getFullDate = (time) => {
    let day = new Date(time).getDate();
    let month = new Date(time).getMonth() + 1;
    let year = new Date(time).getFullYear()
    let fullDate = `${day}/${month}/${year}`;
    return fullDate;
}
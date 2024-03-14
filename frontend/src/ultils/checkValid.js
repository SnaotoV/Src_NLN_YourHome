export const checkvalid = (user, arrPosition) => {
    let err = { isValid: true }
    for (let i = 0; i < arrPosition.length; i++) {
        err[arrPosition[i]] = {
            errCode: 0,
        };
        if (!user[arrPosition[i]]) {
            err[arrPosition[i]] = {
                errCode: 1,
            };
            err.isValid = false;
        }
    }
    return err;
}
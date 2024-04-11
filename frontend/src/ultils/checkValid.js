export const checkvalid = (data, arrPosition) => {
    let err = { isValid: true }
    for (let i = 0; i < arrPosition.length; i++) {
        if (data[arrPosition[i]]) {
            err[arrPosition[i]] = {
                errCode: 0,
            };
        }
        else {
            err.isValid = false;
            err[arrPosition[i]] = {
                errCode: 1,
            };
        }
    }
    return err;
}
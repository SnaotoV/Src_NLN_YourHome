export const checkvalid = (data, arrPosition) => {
    let err = { isValid: true }
    for (let i = 0; i < arrPosition.length; i++) {
        err[arrPosition[i]] = {
            errCode: 0,
        };
    }

    return err;
}
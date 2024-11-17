import jwt from 'jsonwebtoken';

let generateToken = (user) => {
    const payload = {
        _id: user._id,
        CICNumber: user.CICNumber,
        fullname: user.fullname,
        address: user.address,
        phoneNumber: user.phoneNumber,
        birthday: user.gender,
        isAdmin: user.isAdmin
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 24 * 60 * 60 });
    return token;
}
let generateRefreshToken = (user) => {
    const payload = {
        _id: user._id,
        CICNumber: user.CICNumber,
        fullname: user.fullname,
        address: user.address,
        phoneNumber: user.phoneNumber,
        birthday: user.gender,
        isAdmin: user.isAdmin
    }
    const token = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: 7 * 24 * 60 * 60 });
    return token;
}

let getNewToken = (token) => {
    const refreshToken = token;
    let data = {
        errCode: 0,
        newAccessToken: '',
        newRefreshToken: '',
        message: ''
    }

    if (!refreshToken) {
        data.errCode = 400
        data.message = 'Không tìm thấy RefreshToken'
    }
    else {

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
            const newAccessToken = generateToken({
                _id: user._id,
                CICNumber: user.CICNumber,
                fullname: user.fullname,
                address: user.address,
                phoneNumber: user.phoneNumber,
                birthday: user.gender,
                isAdmin: user.isAdmin
            });
            const newRefreshToken = generateRefreshToken({
                _id: user._id,
                CICNumber: user.CICNumber,
                fullname: user.fullname,
                address: user.address,
                phoneNumber: user.phoneNumber,
                birthday: user.gender,
                isAdmin: user.isAdmin
            });
            data.newAccessToken = newAccessToken;
            data.newRefreshToken = newRefreshToken
        })

    }
    return data;
}

let verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Token không được cung cấp" });
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token không hợp lệ' });
    }
}

module.exports = {
    verifyToken,
    getNewToken,
    generateToken,
    generateRefreshToken
}
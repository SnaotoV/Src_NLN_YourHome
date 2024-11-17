import querystring from 'qs';
import crypto from 'crypto';
import moment from 'moment';
import roomService from '../services/roomService'
let sortObject = (obj) => {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
let createPaymentUrl = (req, res, next) => {
    var date = new Date();
    var createDate = moment(date).format('YYYYMMDDHHmmss');

    var ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var tmnCode = 'LMW96OFU';
    var secretKey = '49AZA7Z95UV0HVCWLE5OPQWPQ2MBCBBY';
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = 'http://localhost:3030/vnpay_check';
    // var createDate = (date);
    // var orderId = (date, 'HHmmss');
    var orderId = moment(date).format('DDHHmmss');

    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = 'vn';
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    var date = new Date();
    date.setDate(date.getDate() + 1);
    vnp_Params['vnp_ExpireDate'] = moment(date).format('YYYYMMDDHHmmss');
    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    // console.log(vnpUrl);
    // console.log(amount);
    return res.status(200).send(vnpUrl);
};
let checkPayment = async (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = '49AZA7Z95UV0HVCWLE5OPQWPQ2MBCBBY';
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    if (secureHash === signed) {
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        // Kiểm tra duyệt thanh toán và cập nhật trạng thái đơn hàng
        if (rspCode === '00') {
            const bill = await roomService.getBillId(vnp_Params['vnp_OrderInfo']);
            if (bill) {
                let resData = await roomService.updateBill(vnp_Params['vnp_OrderInfo'], "VNPay");
                res.redirect(`http://localhost:3000/Pay/${vnp_Params['vnp_OrderInfo']}/success`);
                // res.status(200).json({
                //     errCode: resData.errCode,
                //     value: resData.value
                // })
            }
            else {
                res.status(404).json({
                    message: "Không tìm thấy đơn hàng"
                });
            }
            // Thanh toán thành công
            // const order = await Order.findById(vnp_Params['vnp_OrderInfo']);
            // if (order) {
            //     order.isPaid = true;
            //     order.paidAt = Date.now();
            //     order.paymentMethod = 'VNPay';
            //     const updatedOrder = await order.save();
            //     // Chuyển hướng người dùng trở lại trang của bạn
            //     res.status(404);
            //     throw new Error('Không tìm thấy đơn hàng');
            // }
        } else {
            // Xử lý trường hợp thanh toán thất bại(nếu cần)
            res.status(404).json({
                message: "Lỗi xảy ra vui lòng quay lại sau"
            });

            // res.redirect(`http://localhost:3000/payment-fail`); // Điều chỉnh đường dẫn theo nhu cầu của bạn
        }
    } else {
        // Xử lý trường hợp checksum không hợp lệ (nếu cần)
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
}
module.exports = {
    createPaymentUrl,
    checkPayment
}
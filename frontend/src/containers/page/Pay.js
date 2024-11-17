import { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { getBillById, updateBill } from "../../services/userServices";
import { connect } from "react-redux";
import { getFullDate } from "../../ultils/getFullDate";
import { Button, Form } from "react-bootstrap";
import { getGender } from "../../ultils/gender";
import { toast } from 'react-toastify';
import { createPayController } from "../../services/appServices";
import VNPayLogo from '../../assets/image/VNPay-Logo.webp'
let Pay = (props) => {
    let [bill, setBill] = useState({});
    let [user, setUser] = useState({});
    const location = useLocation();
    let handleButton = async (type) => {
        try {
            if (type === "moneyPay") {
                let history = props.history;
                let data = await updateBill(props.match.params.id, "moneyPay", user._id)
                if (data && data.errCode === 0) {
                    toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                    history.replace('/Infor/User/1')
                }
                else {
                    toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
                }
            }
            if (type === "VNPay") {
                let data = await createPayController(bill.sumBill, bill._id);
                window.location = data;
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        let getData = async () => {
            if (props.match.params.id) {
                let data = await getBillById(props.match.params.id);
                if (data) {
                    setBill(data?.resData[0]);
                }
            }
        }
        getData()
    }, [props.match.params.id])
    useEffect(() => {
        if (props.userInfor) {
            setUser(props.userInfor)
        }
    }, [props.userInfor])
    useEffect(() => {
        const isSuccess = location.pathname.includes("success");
        isSuccess && toast.success("Thanh toán thành công");
        let getData = async () => {
            if (props.match.params.id) {
                let data = await getBillById(props.match.params.id);
                if (data) {
                    setBill(data?.resData[0]);
                }
            }
            if (props.userInfor) {
                setUser(props.userInfor)
            }
        }
        getData();
    }, [])

    return (
        <div className="container p-4">
            <div className="row bg-white m-4 rounded-4 shadow p-4">
                <div className="row col-6">
                    {bill && bill.priceEW && bill.priceEW.length > 0 &&

                        <table className="fs-5 border infor-box">
                            <thead>
                                <tr>
                                    <td colSpan={2} className="text-center py-2 fs-3 main-title">Hóa đơn</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="px-4">Ngày lập hóa đơn:</td>
                                    <td className="px-4">{getFullDate(bill.create_at)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Ngày bắt đầu:</td>
                                    <td className="px-4">{getFullDate(bill.time_start)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Ngày kết thúc:</td>
                                    <td className="px-4">{getFullDate(bill.time_end)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Số kg điện:</td>
                                    <td className="px-4">{bill.valueE} kgW</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Số khối nước:</td>
                                    <td className="px-4">{bill.valueW} khối</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Tiền thuê:</td>
                                    <td className="px-4">{bill?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ/tháng</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Tiền điện: {bill.valueE}x{bill.priceEW[0]?.priceE.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                    <td className="px-4">{(bill.valueE * bill.priceEW[0]?.priceE).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ/tháng</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Tiền nước: {bill.valueW}x{bill.priceEW[0]?.priceW.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                    <td className="px-4">{(bill.valueW * bill.priceEW[0]?.priceW).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ/tháng</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Tổng tiền:</td>
                                    <td className="px-4">{bill.sumBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ/tháng</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>

                <div className="row col-6">
                    {user &&
                        <table className="fs-5 border infor-box ">
                            <thead>
                                <tr>
                                    <td colSpan={2} className="text-center py-2 fs-3 main-title">Thông tin Thanh Toán</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="px-4">Số căn cước:</td>
                                    <td className="px-4">{user && user.CICNumber}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Giới tính  :</td>
                                    <td className="px-4">{user && getGender(user.gender)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Ngày sinh:</td>
                                    <td className="px-4">{user && user.birthday}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Quê quán:</td>
                                    <td className="px-4">{user && user.address}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Số điện thoại:</td>
                                    <td className="px-4">{user && user.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" className="p-2">
                                        <Button className="w-100" onClick={() => { handleButton("moneyPay") }} > Thanh toán trực tiếp</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" className="p-2">
                                        <Button className="w-100 p-0" variant="warning" onClick={() => { handleButton("VNPay") }}> <img src={VNPayLogo} height="80px"></img></Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div >
    )
}
const mapStateToProps = state => {
    return {
        userInfor: state.user.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pay));
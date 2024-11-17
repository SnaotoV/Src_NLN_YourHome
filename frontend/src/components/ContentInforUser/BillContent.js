import { useEffect, useState } from "react";
import Pagenated from "../Pagenated/Pagenated";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQuantityPage, getDataInPage, getNewToken } from "../../services/appServices";
import { getFullDate } from "../../ultils/getFullDate";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
let BillContent = (props) => {
    let [user, setUser] = useState({ ...props.userInfor });
    let [page, setPage] = useState(1);
    let [listBill, setListBill] = useState({});
    let [quantityPage, setQuantityPage] = useState(1);
    useEffect(() => {
        let getData = async () => {
            let clonePage = page;
            let filter = {
                userId: user ? user._id : ''
            }
            if (user && user._id) {
                let cloneListBill = await getDataInPage('bill', clonePage, 10, filter);
                let quantityPageFromBE = await getQuantityPage('bill', 10, filter);
                setListBill(cloneListBill.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData()
    }, []);
    useEffect(() => {
        let getData = async () => {
            try {

                let clonePage = page
                let filter = {
                    userId: user ? user._id : ''
                }
                if (user && user._id) {
                    let cloneListBill = await getDataInPage('bill', clonePage, 10, filter);
                    let quantityPageFromBE = await getQuantityPage('bill', 10, filter);
                    setListBill(cloneListBill.data);
                    setQuantityPage(quantityPageFromBE);
                }

            } catch (error) {
                if (error.response.status === 400) {
                    let check = await getNewToken();
                    if (check) {
                        getData();
                    }
                }
            }
        }
        getData()
    }, [props.checkGetData, user, page]);

    useEffect(() => {
        let clonePage = props.match.params.page;
        setUser(props.userInfor);
        setPage(clonePage);
    }, [props.match.params.page, props.userInfor])
    console.log(listBill);

    return (
        <div>
            <div>Danh sách nhà trọ</div>
            <div className="contentBox">
                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>tên dãy trọ</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Chỉ số điện</th>
                            <th>Chỉ số nước</th>
                            <th>Tiền điện</th>
                            <th>Tiền nước</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listBill && listBill.length > 0 && listBill.map((item, index) => {
                                return (
                                    <tr className="text-center" key={index}>
                                        <td >{index + 1}</td>
                                        <td>{item.motel[0].name}</td>
                                        <td>{getFullDate(item.time_start)}</td>
                                        <td>{getFullDate(item.time_end)}</td>
                                        <td>{item.valueE}</td>
                                        <td>{item.valueW}</td>
                                        <td>{item.eBill}đ</td>
                                        <td>{item.wBill}đ</td>
                                        <td>{item.sumBill}đ</td>
                                        <td>{item.statusCode === 6 ? <p className="text-success">Đã thanh toán - {item.typePayment === "VNPay" ? "VNPay" : "Tiền mặt"}</p> : <p className="text-danger">Chưa thanh toán</p>}</td>
                                        <td>{item.date_pay !== null ? getFullDate(item.time_end) : <p className="text-danger">"Chưa thanh toán"</p>}</td>
                                        <td>{item.statusCode === 6 ? <p className="text-success">Đã thanh toán - {item.typePayment === "VNPay" ? "VNPay" : "Tiền mặt"}</p> : <Link to={`/Pay/${item._id}`} className="w-100 btn main-button">Thanh Toán</Link>}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                    <tfoot >
                        <tr >
                            <td colSpan="11">
                                <Pagenated
                                    quantityPage={quantityPage}
                                    className="d-flex justify-content-center"
                                ></Pagenated>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </div >
    )
}
const mapStatetoProps = state => {
    return {
        userInfor: state.user.userInfor
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(BillContent))
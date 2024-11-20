import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getMotel } from '../../services/userServices';
import { Button, Table } from "react-bootstrap";
import Pagenated from '../../components/Pagenated/Pagenated';
import { getDataInPage, getQuantityPage } from '../../services/appServices';
import { getGender } from '../../ultils/gender';
import EditModelForm from '../../components/AddMotelForm/EditModelForm';
import ScheduleSeenRoom from '../../components/ContactRoom/scheduleSeenRoom';
import { getFullDate } from "../../ultils/getFullDate";
import { noneHire, findInforHire, updateBill } from "../../services/userServices";
import RemoveHire from "../../components/HireRoom/RemoveHire";
import { toast } from "react-toastify";
let InforRoom = (props) => {
    let [Room, setRoom] = useState({});
    let [page, setPage] = useState(1);
    let [listBill, setListBill] = useState({});
    let [quantityPage, setQuantityPage] = useState(1);
    let handleBtn = async (id) => {
        try {
            let data = await updateBill(id, "livePay");
            console.log(data);

            if (data && data.errCode === 0) {
                toast.success(data.value);
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    let getData = async () => {
        let filter = {
            _id: props.match.params.id
        }
        let clonePage = page
        let data = await findInforHire(filter);
        if (props.match.params.id) {
            let billFilter = {
                hireId: props.match.params.id,
            }
            let cloneListBill = await getDataInPage('bill', clonePage, 10, billFilter);
            let quantityPageFromBE = await getQuantityPage('bill', 10, billFilter);
            console.log(cloneListBill);
            console.log(quantityPageFromBE);

            setListBill(cloneListBill.data);
            setQuantityPage(quantityPageFromBE);
        }
        setRoom(data.resData[0])
    }
    useEffect(() => {
        let getData = async () => {
            let filter = {
                _id: props.match.params.id
            }
            let clonePage = page
            let data = await findInforHire(filter);
            if (props.match.params.id) {
                let billFilter = {
                    hireId: props.match.params.id,
                }
                let cloneListBill = await getDataInPage('bill', clonePage, 10, billFilter);
                let quantityPageFromBE = await getQuantityPage('bill', 10, billFilter);
                console.log(cloneListBill);
                console.log(quantityPageFromBE);

                setListBill(cloneListBill.data);
                setQuantityPage(quantityPageFromBE);
            }
            setRoom(data.resData[0])
        }
        getData()

    }, [props.userInfor, props.match.params.id, page])
    console.log(Room);

    useEffect(() => {
        let clonePage = props.match.params.page;
        setPage(clonePage);
    }, [props.match.params.page, props.userInfor])
    return (
        <div className="container ">
            {
                Room &&
                <div className="row my-2">
                    <div className="col-6 p-1">
                        <div className=" bg-white rounded-4 shadow-lg ">
                            <div className="h4 text-center main-title rounded-top-4 py-2">Thông tin dãy trọ</div>
                            <div className="p-2 m-2">
                                <p className="h5">{Room.motel?.length > 0 && Room.motel[0].name}</p>
                                <p>{Room.motel?.length > 0 && Room.motel[0].address}</p>
                                <p>{Room.motel?.length > 0 && Room.motel[0].ward.path_with_type}</p>
                                <p>{Room.motel?.length > 0 && Room.motel[0].horizontal} X {Room.motel?.length > 0 && Room.motel[0].vertical}m</p>
                                <p></p>
                                <p className="h5">{Room.motel?.length > 0 && Room.motel[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 p-1">
                        <div className=" bg-white rounded-4 shadow-lg">
                            <div className="h4 text-center rounded-top-4 main-title py-2">Thông tin chủ trọ</div>
                            <div className="p-2 m-2">
                                <p className="h5">{Room.motel?.length > 0 && Room.motel[0].user[0].fullName}</p>
                                <p>Tên tài khoản: {Room.motel?.length > 0 && Room.motel[0].user[0].username}</p>
                                <p>Giới tính: {Room.motel?.length > 0 && getGender(Room.motel[0].user[0].gender)}</p>
                                <p>SĐT: {Room.motel?.length > 0 && Room.motel[0].user[0].phoneNumber}</p>
                                <p>Căn cước công dân: {Room.motel?.length > 0 && Room.motel[0].user[0].CICNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-1 my-2">
                        <div className=" bg-white rounded-4 shadow-lg">
                            <div className="h4 text-center main-title rounded-top-4 py-2">Danh sách hóa đơn</div>
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
                                            <th>Thao tác</th>
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
                                                        {
                                                            // Room.motel?.length > 0 && Room.motel[0].userId === props.userInfor._id &&
                                                            // <td>{item.statusCode === 7 || item.statusCode === 11 ? <Button variant="success" onClick={() => { handleBtn(item._id) }}>Đã thanh toán trực</Button> : ""}</td>
                                                            <td>{item.statusCode === 6 ? <p className="text-success">Đã thanh toán - {item.typePayment === "VNPay" ? "VNPay" : "Tiền mặt"}</p> : <Link to={`/Pay/${item._id}`} className="w-100 btn main-button">Thanh Toán</Link>}</td>

                                                        }
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
                        </div>
                    </div>
                </div>
            }
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
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(InforRoom));
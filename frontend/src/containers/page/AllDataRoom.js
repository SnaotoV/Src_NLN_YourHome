import { withRouter, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getMotel } from '../../services/userServices';
import { Button, Table } from "react-bootstrap";
import Pagenated from '../../components/Pagenated/Pagenated';
import { getListYear } from "../../ultils/getFullDate";
import { getDataInPage, getQuantityPage } from '../../services/appServices';
import { getGender } from '../../ultils/gender';
import EditModelForm from '../../components/AddMotelForm/EditModelForm';
import ScheduleSeenRoom from '../../components/ContactRoom/scheduleSeenRoom';
import { getFullDate } from "../../ultils/getFullDate";
import { noneHire, findInforHire, updateBill, findAllDataRoom, getBillAllMotel } from "../../services/userServices";
import RemoveHire from "../../components/HireRoom/RemoveHire";
import { Bar, Line } from 'react-chartjs-2';
import { toast } from "react-toastify";
let AllDataRoom = (props) => {
    let [Room, setRoom] = useState({});
    let [page, setPage] = useState(1);
    let [listBill, setListBill] = useState({});
    let [quantityPage, setQuantityPage] = useState(1);
    let [listYear, setListYear] = useState([])
    let [listHire, setListHire] = useState([]);
    let [year, setYear] = useState(new Date().getFullYear());

    let [dataRoom, setDataRoom] = useState({
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    })
    let handleBtn = async (id) => {
        try {
            let data = await updateBill(id, "livePay");

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
            roomId: props.match.params.id,
            statusCode: "all"
        }
        let filterRoom = {
            id: props.match.params.id
        }
        let clonePage = page
        let dataRoom = await findAllDataRoom(filterRoom);

        if (dataRoom.resData[0].motel[0].userId === props.userInfor?._id) {
            setListYear(getListYear(new Date(dataRoom.resData[0].motel[0].create_at).getFullYear()));
            let filterBar = {
                roomId: props.match.params.id,
                year: year
            }
            let dataBillThisRoom = await getBillAllMotel(filterBar);
            setDataRoom({
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                datasets: [
                    {
                        label: 'Doanh thu',
                        data: dataBillThisRoom.value,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
            let data = await findInforHire(filter);
            if (props.match.params.id) {
                let billFilter = {
                    roomId: props.match.params.id,
                }
                let cloneListBill = await getDataInPage('bill', clonePage, 10, billFilter);
                let quantityPageFromBE = await getQuantityPage('bill', 10, billFilter);
                setListBill(cloneListBill.data);
                setQuantityPage(quantityPageFromBE);
            }
            setListHire(data.resData);
            setRoom(dataRoom.resData[0])
        }
        else {
            let history = props.history;
            history.replace({ pathname: '/' });
        }
    }
    useEffect(() => {
        console.log("user ", props.userInfor?.isAdmin);

        let getData = async () => {
            let filter = {
                roomId: props.match.params.id,
                statusCode: "all"
            }
            let filterRoom = {
                id: props.match.params.id
            }
            let clonePage = page
            let dataRoom = await findAllDataRoom(filterRoom);

            if (dataRoom.resData[0].motel[0].userId === props.userInfor?._id || props.userInfor?.isAdmin === true) {
                setListYear(getListYear(new Date(dataRoom.resData[0].motel[0].create_at).getFullYear()));
                let filterBar = {
                    roomId: props.match.params.id,
                    year: year
                }
                let dataBillThisRoom = await getBillAllMotel(filterBar);
                setDataRoom({
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Doanh thu',
                            data: dataBillThisRoom.value,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
                let data = await findInforHire(filter);
                if (props.match.params.id) {
                    let billFilter = {
                        roomId: props.match.params.id,
                    }
                    let cloneListBill = await getDataInPage('bill', clonePage, 10, billFilter);
                    let quantityPageFromBE = await getQuantityPage('bill', 10, billFilter);
                    setListBill(cloneListBill.data);
                    setQuantityPage(quantityPageFromBE);
                }
                setListHire(data.resData);
                setRoom(dataRoom.resData[0])
            }
            else {
                let history = props.history;
                history.replace({ pathname: '/' });
            }
        }
        if (props.userInfor?._id) {
            getData()
        }

    }, [props.userInfor, props.match.params.id, page, year])

    useEffect(() => {
        let clonePage = props.match.params.page;
        setPage(clonePage);
    }, [props.match.params.page, props.userInfor])
    const optionsAllMotel = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Doanh thu toàn phòng trọ theo tháng trong năm ${year}`,
            },
        },
    };
    console.log(listHire);

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
                        <div className=" bg-white rounded-4 shadow-lg p-4">
                            <Form className="col-2" >
                                <Form.Select id="disabledSelect" onChange={(event) => { setYear(event.target.value) }}>
                                    {listYear.length > 0 && listYear.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form>
                            <Bar data={dataRoom} options={optionsAllMotel} />
                        </div>
                    </div>
                    <div className="col-12 p-1 my-2">
                        <div className=" bg-white rounded-4 shadow-lg">
                            <div className="h4 text-center main-title rounded-top-4 py-2">Danh sách hóa đơn</div>
                            <div className="contentBox">
                                <Table>
                                    <thead>
                                        <tr className="text-center">
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
                                                        <td>{item.statusCode === 6 ? <p className="text-success">Đã thanh toán - {item.typePayment === "VNPay" ? "VNPay" : "Tiền mặt"}</p> : item.statusCode === 11 ? <p className="text-primary">Người dùng muốn thanh toán trực tiếp</p> : <p className="text-danger">Chưa thanh toán</p>}</td>
                                                        <td>{item.date_pay !== null ? getFullDate(item.time_end) : <p className="text-danger">Chưa thanh toán</p>}</td>
                                                        {
                                                            // Room.motel?.length > 0 && Room.motel[0].userId === props.userInfor._id &&
                                                            // <td>{item.statusCode === 7 || item.statusCode === 11 ? <Button variant="success" onClick={() => { handleBtn(item._id) }}>Đã thanh toán trực</Button> : ""}</td>
                                                            <td>{item.statusCode === 6 ? <p className="text-success">Đã thanh toán - {item.typePayment === "VNPay" ? "VNPay" : "Tiền mặt"}</p> : <button className="w-100 btn main-button" onClick={() => { handleBtn(item._id) }}>Đã thanh toán trực tiếp</button>}</td>

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
                    <div className="col-12 p-1 my-2">
                        <div className=" bg-white rounded-4 shadow-lg">
                            <div className="h4 text-center main-title rounded-top-4 py-2">Danh sách người thuê</div>
                            {console.log(listHire.userHire)}
                            {
                                listHire.length > 0 ?
                                    <div className="contentBox">
                                        <Table>
                                            <thead>
                                                <tr className="text-center">
                                                    <th>STT</th>
                                                    <th>Căn cước công dân</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Họ và tên</th>
                                                    <th>Ngày thuê</th>
                                                    <th>Ngày ngưng thuê</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listHire.map((item, index) => {
                                                        return (
                                                            <tr className="text-center" key={index}>
                                                                <td >{index + 1}</td>
                                                                <td>{item.userHire[0].fullName}</td>
                                                                <td>{item.userHire[0].CICNumber}</td>
                                                                <td>{item.userHire[0].phoneNumber}</td>
                                                                <td>{getFullDate(item.create_at)}</td>
                                                                <td>{item.update_at === null ? <div className="text-success">Hiện tại</div> : <div>{getFullDate(item.update_at)}</div>}</td>
                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </Table>
                                    </div>
                                    :
                                    <div className="h4 p-4 text-center">Hiện chưa từng có ai thuê phòng này</div>
                            }
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
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AllDataRoom));
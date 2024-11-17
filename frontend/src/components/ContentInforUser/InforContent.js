import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getQuantityPage, getDataInPage, getNewToken } from "../../services/appServices";
import { getGender } from "../../ultils/gender";
import { Button, Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import Pagenated from '../../components/Pagenated/Pagenated';
import EditSchedule from "../ContactRoom/editSchedule";
import { updateSchedule, hireRoom, findInforHire, noneHire } from "../../services/userServices";
import { getFullDate } from "../../ultils/getFullDate";
import '../../styles/ContentInforUser/InforContent.scss';
import RemoveHire from "../HireRoom/RemoveHire";
let InforContent = (props) => {
    let [user, setUser] = useState({});
    let [listRegisterHire, setListRegisterHire] = useState([]);
    let [quantityPage, setQuantityPage] = useState(1);
    let [page, setPage] = useState(1);
    let [handleSchedule, setHandleSchedule] = useState(false);
    let [handleRemoveHire, setHandleRemoveHire] = useState(false);
    let [activeSchedule, setActiceSchedule] = useState({})
    let [inforHire, setInforHire] = useState({});

    let handleModal = async (type, motel) => {
        if (type === 'success') {
            let resData = await updateSchedule(motel, type);
            if (resData && resData.errCode === 0) {
                await refetchData()
                toast.success(resData.value, { position: toast.POSITION.TOP_RIGHT });
            } else {
                toast.error(resData.value, { position: toast.POSITION.TOP_RIGHT });
            }
        }
        if (type === 'denine') {
            setHandleSchedule(!handleSchedule);
        }
        if (type === 'hire') {
            let resData = await hireRoom(motel, user);
            if (resData && resData.errCode === 0) {
                await refetchData()
                toast.success(resData.value, { position: toast.POSITION.TOP_RIGHT });
            } else {
                toast.error(resData.value, { position: toast.POSITION.TOP_RIGHT });
            }
        }
        if (type === 'none-hire') {
            let resData = await noneHire(motel, user);
            if (resData && resData.errCode === 0) {
                await refetchData()
                toast.success(resData.value, { position: toast.POSITION.TOP_RIGHT });
            } else {
                toast.error(resData.value, { position: toast.POSITION.TOP_RIGHT });
            }
        }
        if (type === "remove-hire") {
            setHandleRemoveHire(!handleRemoveHire);
        }
        if (type === 'remove-hire-success') {
            await refetchData()
            setHandleRemoveHire(!handleRemoveHire);
        }
    }
    let handleButton = async (type, motel) => {
        setActiceSchedule(motel);
        handleModal(type, motel);
        if (handleSchedule === true) {
            await refetchData()
        }

    }
    let refetchData = async () => {
        try {
            let clonePage = page;
            let filter = {
                userId: user ? user._id : ''
            }
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('registerHire', clonePage, 10, filter);
                let quantityPageFromBE = await getQuantityPage('registerHire', 10, filter);
                setListRegisterHire(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
            if (user && user._id) {
                let data = await findInforHire(filter);
                console.log(data);
                if (data.resData.length > 0) {
                    let cloneData = data.resData ? data.resData[0] : {};
                    let date = data.resData ? data.resData[0]?.create_at : new Date();
                    cloneData.dataDate = await getFullDate(date)
                    setInforHire(cloneData);
                }
                else {
                    setInforHire([]);
                }
            }

        } catch (error) {
            if (error.response.status === 400) {
                let check = await getNewToken();
                if (check) {
                    refetchData();
                }
            }
        }
    }
    useEffect(() => {
        setUser(props.userInfor);
    }, [props.userInfor])
    useEffect(() => {
        let getData = async () => {
            let filter = {
                userId: user ? user._id : ''
            }
            if (user && user._id) {
                try {
                    let data = await findInforHire(filter);
                    if (data.resData.length > 0) {
                        let cloneData = data.resData ? data.resData[0] : {};
                        let date = data.resData ? data.resData[0]?.create_at : new Date();
                        cloneData.dataDate = await getFullDate(date)
                        setInforHire(cloneData);
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
        }
        getData()
    }, [user])
    useEffect(() => {
        let getData = async () => {
            let clonePage = page;
            let filter = {
                userId: user ? user._id : ''
            }

            if (user && user._id) {
                let cloneListMotel = await getDataInPage('registerHire', clonePage, 10, filter);
                let quantityPageFromBE = await getQuantityPage('registerHire', 10, filter);
                setListRegisterHire(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData();
    }, [page, user])
    useEffect(() => {
        let clonePage = props.match.params.page;
        setUser(props.userInfor);
        setPage(clonePage);
    }, [props.match.params.page, props.userInfor])
    return (
        <div>
            <div className="row">
                <div className="row">
                    {user &&
                        <div className="col-6">
                            <table className="fs-5 border infor-box ">
                                <thead>
                                    <tr>
                                        <td colSpan={2} className="text-center py-2 fs-3 main-title">Thông tin</td>
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
                                </tbody>
                            </table>
                        </div>
                    }
                    {inforHire &&
                        <div className="col-6">
                            <table className="fs-5 border infor-box ">
                                <thead>
                                    <tr>
                                        <td colSpan={2} className="text-center py-2 fs-3 main-title">
                                            Thông tin thuê phòng <i class="far fa-eye"></i></td>

                                    </tr>
                                </thead>
                                <tbody>
                                    {inforHire._id ?
                                        <>
                                            <tr>
                                                <td className="px-4">Ngày bắt đầu thuê:</td>
                                                <td className="px-4">{inforHire?.dataDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4">Giá:</td>
                                                <td className="px-4">{inforHire?.motel && inforHire?.motel[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4">Giá điện:</td>
                                                <td className="px-4">{inforHire?.motel && inforHire?.motel[0].priceEW.length > 0 && inforHire?.motel[0].priceEW[0].priceE.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4">Giá nước:</td>
                                                <td className="px-4">{inforHire?.motel && inforHire?.motel[0].priceEW.length > 0 && inforHire?.motel[0].priceEW[0].priceW.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                            </tr>
                                            <tr>
                                                {
                                                    inforHire?.bills && inforHire?.bills.length > 0 && inforHire?.bills[0].statusCode == 6 ?
                                                        <td className="px-4 text-center text-success" colSpan={2}>Đã thanh toán tiền tháng này</td>
                                                        :
                                                        <td className="px-4 text-center text-danger" colSpan={2}>Chưa thanh toán tiền tháng này</td>
                                                }
                                            </tr>
                                            <tr>
                                                <td className="px-4" colSpan={2}><Button variant="danger" className="w-100" onClick={() => { handleModal('remove-hire') }}>Đăng ký ngưng thuê</Button></td>
                                            </tr>
                                        </>
                                        :
                                        <div className="warning-infor text-center">
                                            Hiện tại người dùng chưa thuê phòng.
                                        </div>
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                {
                    inforHire && inforHire.bills?.length > 0 &&
                    <div className="row">
                        {
                            inforHire.bills[0] && inforHire.bills[0].statusCode == 7 &&
                            <table className="fs-5 border infor-box ">
                                <thead>
                                    <tr>
                                        <td colSpan={2} className="text-center py-2 fs-3 main-title">Hóa đơn</td>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td className="px-4">Ngày lập hóa đơn:</td>
                                        <td className="px-4 text-end">{getFullDate(inforHire.bills[0].create_at)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Ngày bắt đầu:</td>
                                        <td className="px-4 text-end">{getFullDate(inforHire.bills[0].time_start)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Ngày kết thúc:</td>
                                        <td className="px-4 text-end">{getFullDate(inforHire.bills[0].time_end)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Số kg điện:</td>
                                        <td className="px-4 text-end">{inforHire.bills[0].valueE} kgW</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Số khối nước:</td>
                                        <td className="px-4 text-end">{inforHire.bills[0].valueW} khối</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Tiền thuê:</td>
                                        <td className="px-4 text-end">{inforHire.bills[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ/tháng</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Tiền điện: {inforHire.bills[0].valueE}x{inforHire.motel[0].priceEW[0].priceE.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                        <td className="px-4 text-end">{(inforHire.bills[0].valueE * inforHire.motel[0].priceEW[0].priceE).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Tiền nước: {inforHire.bills[0].valueW}x{inforHire.motel[0].priceEW[0].priceW.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                        <td className="px-4 text-end">{(inforHire.bills[0].valueW * inforHire.motel[0].priceEW[0].priceW).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Tổng tiền:</td>
                                        <td className="px-4 text-end">{inforHire.bills[0].sumBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 text-center" colSpan={2} >
                                            <div>
                                                <Link to={`/Pay/${inforHire.bills[0]._id}`} className="w-100 btn main-button">Thanh Toán</Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>

                }
            </div>
            {listRegisterHire && listRegisterHire.length > 0 &&
                <div className="row m-2">
                    <div className="row">
                        Danh sách đã đăng ký thuê
                    </div>
                    <div className="row">
                        < Table >
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên dãy trọ</th>
                                    <th>Địa chỉ</th>
                                    <th>SDT liên hệ</th>
                                    <th>Lịch hẹn</th>
                                    <th>Thao tác</th>

                                </tr>
                            </thead>
                            <tbody>
                                {listRegisterHire && listRegisterHire.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.motel[0].name}</td>
                                            <td>{item.motel[0].address} {item.motel[0].ward.path_with_type}</td>
                                            <td>{item.motel[0].user[0].phoneNumber}</td>
                                            <td>{item.statusCode === 8 ? `${item.data_Time} ngày ${item.data_Date}` : "Xin đợi chủ dãy trọ lên lịch hẹn"}</td>
                                            <td>
                                                {item.statusCode === 8 ?
                                                    <div className="row ">
                                                        <div className="col-6">
                                                            <Button className="btn-success" onClick={() => handleButton('success', item)}><i className="fa fa-check"></i></Button>
                                                        </div>
                                                        <div className="col-6">
                                                            <Button className="btn-danger font-weight-bold" onClick={() => handleButton('denine', item)}>X</Button>
                                                        </div>
                                                    </div>
                                                    :
                                                    item.statusCode === 10 ?
                                                        <div className="row">
                                                            <Button className="font-weight-bold col m-2" onClick={() => handleButton('hire', item)}>Thuê phòng</Button>
                                                            <Button variant="danger" className="font-weight-bold col m-2" onClick={() => handleButton('none-hire', item)}>Không thuê phòng</Button>
                                                        </div>
                                                        :
                                                        <div>Đợi chủ dãy trọ duyệt</div>
                                                }
                                            </td>
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
            }
            <EditSchedule
                inforRegisterHire={activeSchedule}
                motel={activeSchedule?.motel}
                modalName={"Hủy lịch hẹn"}
                show={handleSchedule}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Lưu'}
                modalClose={'Hủy'} />
            <RemoveHire
                hire={inforHire?._id}
                modalName={"Hủy hợp đồng"}
                show={handleRemoveHire}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Xác nhận'}
                modalClose={'Hủy'} />

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InforContent));
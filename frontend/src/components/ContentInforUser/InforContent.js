import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getQuantityPage, getDataInPage } from "../../services/appServices";
import { getGender } from "../../ultils/gender";
import { Button, Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import Pagenated from '../../components/Pagenated/Pagenated';
import EditSchedule from "../ContactRoom/editSchedule";
import { updateSchedule, hireRoom, findInforHire } from "../../services/userServices";
import { getFullDate } from "../../ultils/getFullDate";
let InforContent = (props) => {
    let [user, setUser] = useState({});
    let [listRegisterHire, setListRegisterHire] = useState([]);
    let [quantityPage, setQuantityPage] = useState(1);
    let [page, setPage] = useState(1);
    let [handleSchedule, setHandleSchedule] = useState(false);
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
    }
    let handleButton = async (type, motel) => {
        setActiceSchedule(motel);
        handleModal(type, motel);
        if (handleSchedule === true) {
            await refetchData()
        }

    }
    let refetchData = async () => {
        let clonePage = page;
        let filter = {
            userId: user ? user._id : ''
        }
        if (user && user._id) {
            let cloneListMotel = await getDataInPage('registerHire', clonePage, filter);
            let quantityPageFromBE = await getQuantityPage('registerHire', 10, filter);
            setListRegisterHire(cloneListMotel.data);
            setQuantityPage(quantityPageFromBE);
        }
        if (user && user._id) {
            let data = await findInforHire(filter);
            if (data.resData.length > 0) {
                let cloneData = data.resData ? data.resData[0] : {};
                let date = data.resData ? data.resData[0]?.create_at : new Date();
                cloneData.dataDate = await getFullDate(date)
                setInforHire(cloneData);
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
                let data = await findInforHire(filter);
                if (data.resData.length > 0) {
                    let cloneData = data.resData ? data.resData[0] : {};
                    let date = data.resData ? data.resData[0]?.create_at : new Date();
                    cloneData.dataDate = await getFullDate(date)
                    setInforHire(cloneData);
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
                let cloneListMotel = await getDataInPage('registerHire', clonePage, filter);
                let quantityPageFromBE = await getQuantityPage('registerHire', 10, filter);
                setListRegisterHire(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData();
    }, [props.match.params.page, user])
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
                                        <td colSpan={2} className="text-center py-2 fs-3 main-title">Thông tin thuê phòng</td>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td className="px-4">Ngày bắt đầu thuê:</td>
                                        <td className="px-4">{inforHire?.dataDate}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Giá:</td>
                                        <td className="px-4">{inforHire?.motel && inforHire?.motel[0].price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                    </tr>
                                    <tr>
                                        {console.log(inforHire)}
                                        <td className="px-4">Giá điện:</td>
                                        <td className="px-4">{inforHire?.motel && inforHire?.motel[0].priceEW.length > 0 && inforHire?.motel[0].priceEW[0].priceE.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4">Giá nước:</td>
                                        <td className="px-4">{inforHire?.motel && inforHire?.motel[0].priceEW.length > 0 && inforHire?.motel[0].priceEW[0].priceW.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" className="p-2">
                                            <Link to={`/User/Room/${inforHire?.roomId}`} className="w-100 btn btn-primary">Xem chi tiết</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }

                </div>
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
                                                        <Button className="font-weight-bold" onClick={() => handleButton('hire', item)}>Xác nhận thuê phòng</Button>
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
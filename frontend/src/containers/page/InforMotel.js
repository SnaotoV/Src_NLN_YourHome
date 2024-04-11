import Pagination from 'react-bootstrap/Pagination';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getMotel } from '../../services/userServices';
import { Table } from "react-bootstrap";
import Pagenated from '../../components/Pagenated/Pagenated';
import { getDataInPage, getQuantityPage } from '../../services/appServices';
import { getGender } from '../../ultils/gender';
import EditModelForm from '../../components/AddMotelForm/EditModelForm';
import ScheduleSeenRoom from '../../components/ContactRoom/scheduleSeenRoom';
let InforMotel = (props) => {
    let [dataMotel, setDataMotel] = useState({});
    let [listImage, setListImage] = useState([]);
    let [activeImage, setActiveImage] = useState();
    let [listRegisterHire, setListRegisterHire] = useState([]);
    let [countEmpty, setCountEmpty] = useState(0);
    let [handleModal, setHanldeModal] = useState(false);
    let [activeRegistorHire, setActiveRegistorHire] = useState({});
    let [page, setPage] = useState(1);
    let [quantityPage, setQuantityPage] = useState(1);
    let [user, setUser] = useState({ ...props.userInfor });
    let [handleAddMotelModal, setHandleAddMotelModel] = useState(false)
    let [handleSchedule, setHandleSchedule] = useState(false)

    let changeImage = (event, item) => {
        setActiveImage(item)
    }
    let handleButtonModal = (type, data) => {
        if (type === 'edit') {
            setHandleAddMotelModel(!handleAddMotelModal);
        }
        if (type === 'schedule') {
            setHandleSchedule(!handleSchedule);
            setActiveRegistorHire(data);
        }
    }

    // let handleButton = (room, index) => {
    //     room.index = index + 1;
    //     setActiveRoom(room);
    //     handleButtonModal();
    // }
    useEffect(() => {
        let idMotel = props.match.params.id;
        let idUser = props.userInfor ? props.userInfor._id : null
        if (idUser) {
            let getData = async () => {
                setUser(props.userInfor);
                let data = await getMotel(idMotel, idUser, 'admin')
                setDataMotel(data.data);
                if (data && data.data.image.length <= 3) {
                    setListImage(data.data.image);
                    setActiveImage(data.data.image[0]);
                }
                let clonePage = page;
                let filter = {
                    motelId: dataMotel._id ? dataMotel._id : ''
                }
                if (user && user._id) {
                    let cloneListMotel = await getDataInPage('registerHire', clonePage, filter);
                    let quantityPageFromBE = await getQuantityPage('registerHire', 10, filter);
                    setListRegisterHire(cloneListMotel.data);
                    setQuantityPage(quantityPageFromBE);
                }
            }
            getData();
        }
    }, [])
    useEffect(() => {
        let idMotel = props.match.params.id;
        let idUser = props.userInfor ? props.userInfor._id : null
        if (idUser) {
            let getData = async () => {
                setUser(props.userInfor);
                let data = await getMotel(idMotel, idUser, 'admin')
                setDataMotel(data.data);
                if (data && data.data.image.length <= 5) {
                    setListImage(data.data.image);
                    setActiveImage(data.data.image[0]);
                }
                if (data && data.data.listRoom.length > 0) {
                    let count = 0;
                    data.data.listRoom.forEach(item => {
                        if (item.statusCode === 1) {
                            count++
                        }
                    });
                    setCountEmpty(count);
                }
            }
            getData();
        }
    }, [props.userInfor, user])
    useEffect(() => {
        let getData = async () => {
            let clonePage = page;
            let filter = {
                motelId: dataMotel._id ? dataMotel._id : ''
            }
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('registerHire', clonePage, filter);
                let quantityPageFromBE = await getQuantityPage('registerHire', 10, filter);
                setListRegisterHire(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData();
    }, [props.match.params.page, dataMotel])
    return (
        <div className="container bg-white px-3 rounded-4 shadow-lg">
            {dataMotel && dataMotel._id &&
                <>
                    <div className="row  p-4">
                        <div className="col-4 p-2">
                            <div className="bg-white row ">
                                {activeImage &&
                                    <img className="image-motel main-bg col-12 row" src={activeImage.image} placeholder={`Hình ảnh dãy trọ ${dataMotel.name}`} />
                                }
                                <div className="row">
                                    {listImage && listImage.length > 0 && listImage.map((item, index) => {
                                        return (
                                            <div className="col row item-image my-2 main-bg" key={index}>
                                                <img className="col" onMouseEnter={(event) => changeImage(event, item)} src={item.image} placeholder={`Hình ảnh dãy trọ ${dataMotel.name}`} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='row'><button className='btn btn-primary' onClick={() => { handleButtonModal('edit') }}>Chỉnh sửa</button> </div>
                        </div>
                        <div className="col-8 px-4">
                            <div className=" px-4">
                                <div className="motel-title">
                                    <span>{dataMotel.name}</span>
                                </div>
                                <div className="motel-price px-4 py-2">
                                    <span>{dataMotel && dataMotel.price && dataMotel.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND/tháng</span>
                                </div>
                                <div className="motel-price-ew">
                                    <span className="px-4">{dataMotel && dataMotel.priceEW && dataMotel.priceEW[0].priceE.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND/tháng</span>
                                    <span>{dataMotel && dataMotel.priceEW && dataMotel.priceEW[0].priceW.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND/tháng</span>
                                </div>
                                <div className="my-4">
                                    <div className="row">
                                        <div className="col-2">Phòng trống: </div>
                                        <div className="col">{countEmpty}/{dataMotel.listRoom.length}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">Dài: </div>
                                        <div className="col">{dataMotel.vertical}m</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">Rộng: </div>
                                        <div className="col">{dataMotel.horizontal}m</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">Địa chỉ: </div>
                                        <div className="col">{dataMotel.address} {dataMotel.ward.path_with_type} </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {dataMotel.listRoom && dataMotel.listRoom.map((item, index) => {
                                    return (
                                        <div key={index} className="col-3  my-2 text-center">
                                            <div className="border btn rounded main-button w-100">
                                                Phòng {index + 1}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='row my-4'>
                            <p className="fs-3 text_center">
                                Danh sách hẹn xem phòng.
                            </p>
                            <Table>
                                <thead>
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>Tên người dùng</th>
                                        <th>Số điện thoại</th>
                                        <th>Căn cước công dân</th>
                                        <th>Quê quán</th>
                                        <th>Giới tính</th>
                                        <th>Hẹn gặp</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listRegisterHire && listRegisterHire.map((item, index) => {
                                        return (
                                            < tr className="text-center" key={index} >
                                                <td >{index + 1}</td>
                                                <td>{item.user[0]?.fullName}</td>
                                                <td>{item.user[0]?.phoneNumber}</td>
                                                <td>{item.user[0]?.CICNumber}</td>
                                                <td>{item.user[0]?.address}</td>
                                                <td>{getGender(item.user[0]?.gender)}</td>
                                                <td>{item.data_Date !== null ? item.data_Date : "Chưa duyệt"}</td>
                                                <td><button className='btn btn-primary' onClick={() => { handleButtonModal('schedule', item) }}>Lên lịch</button></td>
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
                </>
            }
            <EditModelForm
                motel={dataMotel}
                modalName={"Thêm dãy nhà trọ"}
                show={handleAddMotelModal}
                handleClickChanges={handleButtonModal}
                handleClickClose={handleButtonModal}
                modalChanges={'Lưu'}
                modalClose={'Hủy'} />
            <ScheduleSeenRoom
                inforRegisterHire={activeRegistorHire}
                motel={dataMotel}
                modalName={"Thêm dãy nhà trọ"}
                show={handleSchedule}
                handleClickChanges={handleButtonModal}
                handleClickClose={handleButtonModal}
                modalChanges={'Lưu'}
                modalClose={'Hủy'} />
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
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(InforMotel));
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getMotel } from '../../services/userServices';
import { Table } from "react-bootstrap";
import Pagenated from '../../components/Pagenated/Pagenated';
import { getDataInPage, getQuantityPage } from '../../services/appServices';
import { getGender } from '../../ultils/gender';
import EditModelForm from '../../components/AddMotelForm/EditModelForm';
import ScheduleSeenRoom from '../../components/ContactRoom/scheduleSeenRoom';
import { getFullDate } from "../../ultils/getFullDate";
let InforMotel = (props) => {
    let [dataMotel, setDataMotel] = useState({});
    let [listImage, setListImage] = useState([]);
    let [activeImage, setActiveImage] = useState();
    let [listRegisterHire, setListRegisterHire] = useState([]);
    let [countEmpty, setCountEmpty] = useState(0);
    let [activeRegistorHire, setActiveRegistorHire] = useState({});
    let [page, setPage] = useState(1);
    let [quantityPage, setQuantityPage] = useState(1);
    let [user, setUser] = useState({ ...props.userInfor });
    let [handleAddMotelModal, setHandleAddMotelModel] = useState(false)
    let [handleSchedule, setHandleSchedule] = useState(false)
    let [checkImage, setCheckImage] = useState(0);
    let changeImage = (event, item) => {
        setActiveImage(item)
    }
    let handleButtonModal = async (type, data) => {
        if (type === 'edit') {
            setHandleAddMotelModel(!handleAddMotelModal);
        }
        if (type === 'schedule') {
            setHandleSchedule(!handleSchedule);
            setActiveRegistorHire(data);
            await reFetchData();
        }
        if (type === 'count-add') {
            if (checkImage >= dataMotel.image.length - 3) {
                setCheckImage(dataMotel.image.length - 3);
            }
            else {
                setCheckImage(checkImage + 1)
            }
        }
        if (type === 'count-remove') {
            if (checkImage <= 0) {
                setCheckImage(0);
            }
            else {
                setCheckImage(checkImage - 1)
            }
        }

    }
    let refrestData = (data) => {
        let cloneMotel = { ...data };
        cloneMotel.priceEW[0].priceE = cloneMotel.priceE;
        cloneMotel.priceEW[0].priceW = cloneMotel.priceW;
        cloneMotel.image = cloneMotel.listImage;
        if (data.listImage) {
            if (data.listImage.length <= 3) {
                setListImage(data.listImage);
                setActiveImage(data.listImage[0]);
            } else {
                let cloneListImage = [data.listImage[checkImage], data.listImage[checkImage + 1], data.listImage[checkImage + 2]]
                setListImage(cloneListImage);
                setActiveImage(data.listImage[0]);
            }
        }
        setDataMotel(cloneMotel)
    }
    let reFetchData = async () => {
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
    useEffect(() => {
        if (dataMotel.image) {
            if (dataMotel.image.length <= 3) {
                setListImage(dataMotel.image);
                setActiveImage(dataMotel.image[0]);
            } else {
                console.log(dataMotel);
                let cloneListImage = [dataMotel.image[checkImage], dataMotel.image[checkImage + 1], dataMotel.image[checkImage + 2]]
                setListImage(cloneListImage);
                setActiveImage(dataMotel.image[0]);
            }
        }

    }, [checkImage])

    useEffect(() => {
        let idMotel = props.match.params.id;
        let idUser = props.userInfor ? props.userInfor._id : null
        if (idUser) {
            let getData = async () => {
                let data = await getMotel(idMotel, 'admin')
                setDataMotel(data?.data);
                if (data && data.data?.image) {
                    if (data.data?.image.length <= 3) {
                        setListImage(data.data.image);
                        setActiveImage(data.data.image[0]);
                    } else {
                        let cloneListImage = [data.data.image[checkImage], data.data.image[checkImage + 1], data.data.image[checkImage + 2]]
                        setListImage(cloneListImage);
                        setActiveImage(data.data.image[0]);
                    }
                }
                if (data && data.data?.listRoom.length > 0) {
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
    }, [props.userInfor, props.match.params.id])
    useEffect(() => {
        setUser(props.userInfor);
    }, [props.userInfor])
    useEffect(() => {
        let getData = async () => {
            let clonePage = page;
            let filter = {
                motelId: dataMotel ? dataMotel._id : ''
            }
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('registerHire', clonePage, filter);
                let quantityPageFromBE = await getQuantityPage('registerHire', 10, filter);
                setListRegisterHire(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData();
    }, [page, dataMotel, user]);
    return (
        <div className="container bg-white px-3 my-4 rounded-4 shadow-lg">
            {dataMotel && user && dataMotel._id && dataMotel.userId === user._id ?
                <>
                    <div className="row  p-4">
                        <div className="col-4 p-2">
                            <div className="bg-white row ">
                                {activeImage &&
                                    <img className="image-motel main-bg col-12 row" src={activeImage.image} placeholder={`Hình ảnh dãy trọ ${dataMotel.name}`} />
                                }
                                <div className="row my-2 main-bg">
                                    <div className="btn btn-primary col-1 fs-3" onClick={() => handleButtonModal('count-remove')}> {'<'}</div>
                                    <div className="col-10">
                                        <div className="row item-image ">
                                            {listImage && listImage.length > 0 && listImage.map((item, index) => {
                                                return (
                                                    <img key={index} className="col-4 item-image" height={'50px'} onMouseEnter={(event) => changeImage(event, item)} src={item.image} placeholder={`Hình ảnh dãy trọ ${dataMotel.name}`} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="btn btn-primary col-1 fs-3" onClick={() => handleButtonModal('count-add')} >{'>'}</div>
                                </div>
                            </div>
                            <div className='row'><button className='btn btn-primary my-2' onClick={() => { handleButtonModal('edit') }}>Chỉnh sửa</button> </div>
                            <div className='row'><Link to={`/User/Hire/Motel/${dataMotel._id}`} className='btn btn-primary my-2'>Quản lý phòng</Link> </div>
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
                                            <div className={`border text-white btn rounded w-100 ${item.statusCode === 1 ? 'btn-success' : 'btn-danger'}`}>
                                                Phòng {index + 1}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="row my-2">
                            <p className="fs-3 text_center">
                                Danh sách thuê phòng.
                            </p>
                            {dataMotel.listRoom && dataMotel.listRoom.filter((item) => {
                                return item.statusCode === 2;
                            }).length > 0 ?
                                < Table >
                                    <thead>
                                        <tr className="text-center">
                                            <th>STT</th>
                                            <th>Tên người dùng</th>
                                            <th>Số điện thoại</th>
                                            <th>Thời gian bắt đầu thuê</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataMotel.listRoom.filter((item) => {
                                            return item.statusCode === 2;
                                        }).map((item, index) => {
                                            return (
                                                <tr className="text-center" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.inforHire[0].user[0].fullName}</td>
                                                    <td>{item.inforHire[0].user[0].phoneNumber}</td>
                                                    <td>{getFullDate(item.inforHire[0].create_at)}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                                :
                                <div className="fs-4 text-center">
                                    <i>
                                        Hiện chưa có lịch hẹn xem phòng
                                    </i>
                                </div>
                            }
                        </div>
                        <div className='row my-4'>
                            <p className="fs-3 text_center">
                                Danh sách hẹn xem phòng.
                            </p>

                            {
                                listRegisterHire && listRegisterHire.length > 0 ?
                                    < Table >
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
                                            {listRegisterHire.map((item, index) => {
                                                return (
                                                    < tr className="text-center" key={index} >
                                                        <td >{index + 1}</td>
                                                        <td>{item.user[0]?.fullName}</td>
                                                        <td>{item.user[0]?.phoneNumber}</td>
                                                        <td>{item.user[0]?.CICNumber}</td>
                                                        <td>{item.user[0]?.address}</td>
                                                        <td>{getGender(item.user[0]?.gender)}</td>
                                                        <td>{item.data_Date !== null ? item.data_Date : "Chưa duyệt"}</td>
                                                        <td>
                                                            {item.statusCode === 9 ?
                                                                <button className='btn btn-primary' onClick={() => { handleButtonModal('schedule', item) }}>Lên lịch</button>
                                                                :
                                                                item.statusCode === 8 ?
                                                                    <div className='bg-primary text-white border-none rounded-2'>Đã lên lịch hẹn đợi xác nhận</div>
                                                                    :
                                                                    <div className='bg-primary text-white'>Khác</div>
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
                                    :
                                    <div className="fs-4 text-center">
                                        <i>
                                            Hiện chưa có lịch hẹn xem phòng
                                        </i>
                                    </div>
                            }
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="warning-box fs-1 m-4 p-4">
                        <div className="text-center w-100 p-4 text-danger">Bạn không có quyền truy cập trang này</div>
                    </div>
                </>
            }
            <EditModelForm
                refrestData={refrestData}
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
                modalName={"Lên lịch hẹn xem phòng"}
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
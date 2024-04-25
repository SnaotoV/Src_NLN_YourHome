import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getMotel } from "../../services/userServices";
import '../../styles/DetailMotel/DetailMotel.scss'
import ContactRoom from "../../components/ContactRoom/contactRoom";
let DetailMotel = (props) => {
    let [dataMotel, setDataMotel] = useState({});
    let [listImage, setListImage] = useState([]);
    let [activeImage, setActiveImage] = useState();
    let [listStatusRoom, setListStatusRoom] = useState({});
    let [countEmpty, setCountEmpty] = useState(0);
    let [handleModal, setHanldeModal] = useState(false);
    let [checkImage, setCheckImage] = useState(0);
    let [activeRoom, setActiveRoom] = useState({});
    let changeImage = (event, item) => {
        setActiveImage(item)
    }
    let handleButtonModal = () => {
        setHanldeModal(!handleModal);
    }
    let handleButtonImage = async (type, data) => {

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
    let handleButton = (room, index) => {
        room.index = index + 1;
        setActiveRoom(room);
        handleButtonModal();
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
        if (idMotel) {
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
    }, [])
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
    return (
        <div className="container bg-white px-3 my-4 rounded-4 shadow-lg">
            {dataMotel && dataMotel._id &&
                <>
                    < div className="row  p-4">
                        <div className="col-4 p-2">
                            <div className="bg-white row ">
                                {activeImage &&
                                    <img className="image-motel main-bg col-12 row" src={activeImage.image} placeholder={`Hình ảnh dãy trọ ${dataMotel.name}`} />
                                }
                                <div className="row  my-2 main-bg">
                                    <div className="btn btn-primary col-1 fs-3" onClick={() => handleButtonImage('count-remove')}> {'<'}</div>
                                    <div className="col-10">
                                        <div className="row item-image ">
                                            {listImage && listImage.length > 0 && listImage.map((item, index) => {
                                                return (
                                                    <img key={index} className="col-4 item-image" height={'50px'} onMouseEnter={(event) => changeImage(event, item)} src={item.image} placeholder={`Hình ảnh dãy trọ ${dataMotel.name}`} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="btn btn-primary col-1 fs-3" onClick={() => handleButtonImage('count-add')} >{'>'}</div>
                                </div>
                            </div>
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
                                {console.log(dataMotel)}
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
                            <p className="fs-5">
                                Chọn phòng để hẹn lịch xem phòng
                            </p>
                            <div className="row">
                                {dataMotel.listRoom && dataMotel.listRoom.map((item, index) => {
                                    return (
                                        <div key={index} className="col-3  my-2 text-center ">
                                            {
                                                item.statusCode !== 2 ?

                                                    <div className="border btn rounded btn-success w-100" onClick={() => handleButton(item, index)}>
                                                        Phòng {index + 1}
                                                    </div>
                                                    :
                                                    <div className="border bg-danger text-white btn rounded w-100">
                                                        Phòng {index + 1}
                                                    </div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <ContactRoom
                        modalName={"Hẹn xem phòng"}
                        show={handleModal}
                        activeRoom={activeRoom}
                        handleClickChanges={handleButtonModal}
                        handleClickClose={handleButtonModal}
                        modalChanges={'Xác nhận'}
                        modalClose={'Hủy'} />
                </>
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
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(DetailMotel));


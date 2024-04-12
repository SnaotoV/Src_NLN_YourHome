import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useEffect, useState } from 'react';
import { updateSchedule } from '../../services/userServices';
let EditSchedule = (props) => {
    let [room, setRoom] = useState({});
    let handleClickClose = () => {
        props.handleClickClose('denine')
    }
    let handleClickChanges = async (type) => {
        let resData = await updateSchedule(room, type);
        if (resData && resData.errCode === 0) {
            handleClickClose();
            toast.success(resData.value, { position: toast.POSITION.TOP_RIGHT });
        } else {
            handleClickClose();
            toast.error(resData.value, { position: toast.POSITION.TOP_RIGHT });
        }
    }
    useEffect(() => {
        setRoom(props.inforRegisterHire);
    }, [props.inforRegisterHire])

    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props
    return (
        <>
            <Modal show={show} onHide={handleClickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn không đồng ý với lịch hẹn {room?.data_Time} {room?.data_Date}
                    </p>
                    <p>Vui lòng liên hệ SDT <b>{room && room.motel && room.motel[0] && room.motel[0].user && room.motel[0].user[0] ? room.motel[0].user[0].phoneNumber : ''}</b> để có thể hẹn gặp</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={modalBtnClose ? modalBtnClose : "secondary"} onClick={handleClickClose}>
                        {modalClose ? modalClose : 'Close'}
                    </Button>
                    <Button variant='danger' onClick={() => handleClickChanges('Cancel')}>
                        Hủy đăng ký
                    </Button>
                    <Button variant={modalBtnChanges ? modalBtnChanges : 'primary'} onClick={() => handleClickChanges('Contact')}>
                        Liên hệ riêng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
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


export default connect(mapStatetoProps, mapDispatchToProps)(EditSchedule);
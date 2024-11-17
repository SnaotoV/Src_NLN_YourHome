import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useEffect, useState } from 'react';
import { registerRoom } from '../../services/userServices';
let ContactRoom = (props) => {
    let [room, setRoom] = useState({});
    let handleClickClose = () => {

        props.handleClickClose()
    }
    let handleClickChanges = async () => {
        try {
            let resData = {};
            if (props.userInfor && props.userInfor._id) {
                resData = await registerRoom(room, props.userInfor);
                if (resData && resData.errCode === 0) {
                    toast.success(resData.value, { position: toast.POSITION.TOP_RIGHT });
                    props.handleClickClose()
                } else {
                    toast.error(resData.value, { position: toast.POSITION.TOP_RIGHT });
                    props.handleClickClose()
                }
            }
            else {
                toast.error('Vui lòng đăng nhập để thực hiện thao tác.', { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            console.log(error.response.status);
        }
    }
    useEffect(() => {
        setRoom(props.activeRoom);
    }, [props.activeRoom])

    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props
    return (
        <>
            <Modal show={show} onHide={handleClickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>   Xác nhận hẹn lịch xem phòng {room.index}.</>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={modalBtnClose ? modalBtnClose : "secondary"} onClick={handleClickClose}>
                        {modalClose ? modalClose : 'Close'}
                    </Button>
                    <Button variant={modalBtnChanges ? modalBtnChanges : 'primary'} onClick={handleClickChanges}>
                        {modalChanges ? modalChanges : "Save Changes"}
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


export default connect(mapStatetoProps, mapDispatchToProps)(ContactRoom);
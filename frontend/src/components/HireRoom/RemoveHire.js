import { Form, Button, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { removeInforHire } from "../../services/userServices";
let HireRoom = (props) => {
    let [hire, setHire] = useState({});
    let handleClickClose = () => {

        props.handleClickClose('remove-hire')
    }
    let handleClickChanges = async () => {
        if (hire) {
            let data = await removeInforHire(hire);
            if (data && data.errCode === 0) {
                toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                props.handleClickClose('remove-hire-success')
            } else {
                toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
            }
        }
    }
    useEffect(() => {
        setHire(props.hire)
    }, [props.hire])

    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props
    return (
        <>
            <Modal show={show} onHide={handleClickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>   Xác nhận hủy hợp đồng đơn phương</>
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


export default connect(mapStatetoProps, mapDispatchToProps)(HireRoom);
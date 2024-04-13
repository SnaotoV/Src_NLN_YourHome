import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useEffect, useState } from 'react';
import { getFullDate } from '../../ultils/getFullDate';
let ModalAddBill = (props) => {
    let [room, setRoom] = useState({});
    let [bill, setBill] = useState({});
    let handleClickClose = () => {
        props.handleClickClose()
    }
    let handleClickChanges = async () => {
        if (room.bills.length <= 0) {
            let month_pay = new Date().getMonth() + 1;
            let time_hire = new Date(room.create_at)
            let year_hire = new Date(room.create_at).getFullYear()
            let date_hire = new Date(room.create_at).getDate()
            let time_at_pay = new Date(year_hire, month_pay, date_hire);
            let cloneBill = {
                ...bill,
                priceEW: props.priceEW?._id,
                price: props.price,
                hireId: room._id,
                time_start: time_hire,
                time_end: time_at_pay,
                date_pay: null,
                date_end: time_at_pay,
                create_at: new Date(),
                update_at: null
            };
            setBill(cloneBill);
            if (cloneBill) {
                let cloneRoom = { ...room };
                cloneRoom.bills = [bill];
                setRoom(cloneRoom);
                props.setRoom(cloneRoom);
            }

        }
        props.handleClickClose()
    }
    let handleOnChangesValue = async (event, id) => {
        let cloneBill = { ...bill };
        cloneBill[id] = event.target.value;
        setBill(cloneBill);
    }
    useEffect(() => {
        setRoom(props.room);
    }, [props.room]);
    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props
    return (
        <>
            <Modal show={show} onHide={handleClickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='row'>
                            <div className='col-6'>Phiếu thu của:</div>
                            <div className='col-6'><b><i>{room?.user && room?.user[0].fullName}</i></b></div>
                        </div>
                        <Form className='my-2'>
                            <Form.Group>
                                <Form.Label htmlFor="valueE">
                                    Số kg điện:
                                </Form.Label>
                                <Form.Control id='valueE' type='number' placeholder="Số kg điện" onChange={(event) => { handleOnChangesValue(event, 'valueE') }}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="valueW">
                                    Số khối nước:
                                </Form.Label>
                                <Form.Control id='valueW' type='number' placeholder="Số khối nước" onChange={(event) => { handleOnChangesValue(event, 'valueW') }}></Form.Control>
                            </Form.Group>
                        </Form>
                    </div>
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


export default connect(mapStatetoProps, mapDispatchToProps)(ModalAddBill);
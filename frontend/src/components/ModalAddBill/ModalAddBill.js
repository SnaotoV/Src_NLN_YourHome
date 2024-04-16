import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { checkvalid } from '../../ultils/checkValid';
import { createBill } from '../../services/userServices';
let ModalAddBill = (props) => {
    let [room, setRoom] = useState({});
    let [bill, setBill] = useState({});
    let [err, setErr] = useState({ isValid: false });

    let handleClickClose = () => {
        props.handleClickClose()
    }
    let handleClickChanges = async () => {
        let check = await checkValidForm();
        if (check.isValid) {
            if (room.bills.length <= 0) {
                let month_pay = new Date().getMonth() + 1;
                let time_hire = new Date(room.create_at);
                let year_hire = new Date(room.create_at).getFullYear();
                let date_hire = new Date(room.create_at).getDate() - 1;
                let time_at_pay = new Date(year_hire, month_pay, date_hire);
                let cloneBill = {
                    valueE: bill.valueE,
                    valueW: bill.valueW,
                    priceEW: props.priceEW?._id,
                    price: props.price,
                    hireId: room._id,
                    time_start: time_hire,
                    time_end: time_at_pay,
                    date_pay: null,
                    date_end: time_at_pay,
                    create_at: new Date(),
                    update_at: null,
                    statusCode: 7,
                };
                setBill(cloneBill);
                if (cloneBill) {
                    let cloneRoom = { ...room };
                    if (cloneBill) {
                        cloneRoom.bills = [cloneBill];
                        props.setRoom(cloneRoom);
                        let data = await createBill(cloneBill);
                        if (data && data.errCode === 0) {
                            setRoom(cloneRoom);
                            setBill({});
                            props.handleClickClose();
                            toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                        }
                        else {
                            toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
                        }
                    }
                }
            }
            else {
                let month_pay = new Date().getMonth() + 1;
                let year_hire = new Date(room.bills[0].date_end).getFullYear();
                let month_hire = new Date(room.bills[0].date_end).getMonth();
                let date_hire = new Date(room.bills[0].date_end).getDate();
                let time_at_pay = new Date(year_hire, month_pay, date_hire);
                let time_hire = new Date(year_hire, month_hire, date_hire + 1);
                let cloneBill = {
                    valueE: bill.valueE,
                    valueW: bill.valueW,
                    priceEW: props.priceEW?._id,
                    price: props.price,
                    hireId: room._id,
                    time_start: time_hire,
                    time_end: time_at_pay,
                    date_pay: null,
                    date_end: time_at_pay,
                    create_at: new Date(),
                    update_at: null,
                    statusCode: 7,
                };
                setBill(cloneBill);
                if (cloneBill) {
                    let cloneRoom = { ...room };
                    if (cloneBill) {
                        cloneRoom.bills = [cloneBill];
                        props.setRoom(cloneRoom);
                        let data = await createBill(cloneBill);
                        if (data && data.errCode === 0) {
                            setRoom(cloneRoom);
                            setBill({});
                            props.handleClickClose();
                            toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                        }
                        else {
                            toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
                        }
                    }
                }
            }
        }
    }
    let checkValidForm = async () => {
        let cloneMotel = { ...bill };
        let positions = ['valueE', 'valueW'];
        let arrErr = await checkvalid(cloneMotel, positions);
        await setErr(arrErr);
        return arrErr;
    }
    let handleOnChangesValue = async (event, id) => {
        let cloneBill = { ...bill };
        cloneBill[id] = Number(event.target.value);
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
                                {err.valueE && err.valueE.errCode === 1 && <div className='text-danger'>Số kg điện được trống</div>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="valueW">
                                    Số khối nước:
                                </Form.Label>
                                <Form.Control id='valueW' type='number' placeholder="Số khối nước" onChange={(event) => { handleOnChangesValue(event, 'valueW') }}></Form.Control>
                                {err.valueW && err.valueW.errCode === 1 && <div className='text-danger'>Số khối nước không được trống</div>}
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
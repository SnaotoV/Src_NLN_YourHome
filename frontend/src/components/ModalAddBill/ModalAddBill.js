import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { checkvalid } from '../../ultils/checkValid';
import { getNewToken } from '../../services/appServices';
import { createBill } from '../../services/userServices';
let ModalAddBill = (props) => {
    let [room, setRoom] = useState({});
    let [bill, setBill] = useState({});
    let [err, setErr] = useState({ isValid: false });
    let [motel, setMotel] = useState(props.motel);
    let handleClickClose = () => {
        setErr({ isValid: false })
        setBill({});
        props.handleClickClose();
    }

    let handleClickChanges = async () => {
        try {
            let check = await checkValidForm();
            if (check.isValid) {
                let cloneBill = {
                    motelId: motel._id,
                    roomId: room.roomId,
                    userPayId: room.user[0]._id,
                    valueE: bill.valueE,
                    valueW: bill.valueW,
                    priceEW: motel.priceEW[0]._id,
                    price: motel.price,
                    hireId: room._id,
                    sumBill: sumBill(),
                    sumHire: bill.sumHire,
                    eBill: bill.eBill,
                    wBill: bill.wBill,
                    time_start: new Date(bill.dateBegin),
                    time_end: new Date(bill.dateEnd),
                    date_pay: null,
                    create_at: new Date(),
                    update_at: null,
                    statusCode: 7,
                }
                let data = await createBill(cloneBill);
                if (data.errCode === 0) {
                    toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                    props.handleClickClose('remove-hire-success');
                }
                else {
                    toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
                }
            }

        } catch (error) {
            if (error?.response?.status === 400) {
                let check = await getNewToken();
                if (check) {
                    handleClickChanges();
                }
            }
        }
    }

    let checkValidForm = async () => {
        let cloneMotel = { ...bill };
        let positions = ['valueE', 'valueW', 'dateBegin', 'dateEnd'];
        let arrErr = await checkvalid(cloneMotel, positions);
        await setErr(arrErr);
        return arrErr;
    }
    let handleOnChangesValue = async (event, id) => {
        let cloneBill = { ...bill };

        if (id === "valueE" || id === "valueW") {
            cloneBill[id] = Number(event.target.value);
        } else {
            cloneBill[id] = event.target.value;
        }
        setBill(cloneBill);
    }
    let sumBill = () => {
        let cloneEBill = bill.eBill ? bill.eBill : 0;
        let cloneSumHire = bill.sumHire ? bill.sumHire : 0;
        let cloneWBill = bill.wBill ? bill.wBill : 0;
        return cloneWBill + cloneEBill + cloneSumHire
    }
    useEffect(() => {
        if (bill.dateBegin && bill.dateEnd || bill.valueE || bill.valueW) {
            let cloneBill = { ...bill };

            if (bill.dateBegin && bill.dateEnd) {
                let dateBeginClone = new Date(cloneBill.dateBegin);
                let dateEndClone = new Date(cloneBill.dateEnd);
                let dateHire = (dateEndClone - dateBeginClone) / (1000 * 60 * 60 * 24);
                let datePrice = motel.price / 30;
                let sumHire = dateHire * datePrice
                cloneBill.sumHire = Math.round(sumHire);

            }

            if (bill.valueE) {
                let eBill = cloneBill.valueE * motel.priceEW[0].priceE;
                cloneBill.eBill = eBill;
            }

            if (bill.valueW) {
                let wBill = cloneBill.valueW * motel.priceEW[0].priceW;
                cloneBill.wBill = wBill;
            }
            setBill(cloneBill);
        }
    }, [bill.dateBegin, bill.dateEnd, bill.valueE, bill.valueW, motel.price, motel.priceEW]);
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
                            <div className='row'>
                                <Form.Group className='col-6'>
                                    <Form.Label htmlFor="valueE">
                                        Số kg điện:
                                    </Form.Label>
                                    <Form.Control id='valueE' type='number' placeholder="Số kg điện" onChange={(event) => { handleOnChangesValue(event, 'valueE') }}></Form.Control>
                                    {err.valueE && err.valueE.errCode === 1 && <div className='text-danger'>Số kg điện được trống</div>}
                                </Form.Group>
                                <Form.Group className='col-6'>
                                    <Form.Label htmlFor="valueW">
                                        Số khối nước:
                                    </Form.Label>
                                    <Form.Control id='valueW' type='number' placeholder="Số khối nước" onChange={(event) => { handleOnChangesValue(event, 'valueW') }}></Form.Control>
                                    {err.valueW && err.valueW.errCode === 1 && <div className='text-danger'>Số khối nước không được trống</div>}
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <Form.Group className='col-6'>
                                    <Form.Label htmlFor='dateBegin'>Ngày bắt đầu:</Form.Label>
                                    <Form.Control id='dateBegin' type='date' onChange={(event) => { handleOnChangesValue(event, 'dateBegin') }}></Form.Control>
                                    {err.dateBegin && err.dateBegin.errCode === 1 && <div className='text-danger'>Ngày bắt đầu không được trống</div>}

                                </Form.Group>
                                <Form.Group className='col-6'>
                                    <Form.Label htmlFor='dateEnd'>Ngày kết thúc:</Form.Label>
                                    <Form.Control id='dateEnd' type='date' onChange={(event) => { handleOnChangesValue(event, 'dateEnd') }}></Form.Control>
                                    {err.dateEnd && err.dateEnd.errCode === 1 && <div className='text-danger'>Ngày kết thúc không được trống</div>}
                                </Form.Group>
                            </div>
                        </Form>
                        <div >
                            <div>Hóa đơn</div>
                            <table className='w-100'>
                                <tr className='row'>
                                    <td className='col-6'>Tiền phòng:</td>
                                    <td className='col-6 text-end'>{bill.sumHire ? bill.sumHire.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}đ</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col-6'>Tiền điện:</td>
                                    <td className='col-6 text-end'>{bill.eBill ? bill.eBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}đ</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col-6'>Tiền nước:</td>
                                    <td className='col-6 text-end'>{bill.wBill ? bill.wBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}đ</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col-6'>Tổng tiền:</td>
                                    <td className='col-6 text-end'>{bill.wBill || bill.eBill || bill.sumHire ? sumBill().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}đ</td>
                                </tr>
                            </table>
                        </div>
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
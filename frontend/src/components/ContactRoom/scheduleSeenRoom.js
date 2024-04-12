import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useEffect, useState } from 'react';
import { checkvalid } from '../../ultils/checkValid';
import { updateSchedule } from '../../services/userServices';
let ScheduleSeenRoom = (props) => {
    let [inforSchedule, setInforSchedule] = useState({});
    let [hour, setHour] = useState({});
    let [min, setMin] = useState({});
    let [err, setErr] = useState({ isValid: false });
    let handleClickClose = () => {
        setErr({});
        setHour({});
        setMin({});
        setInforSchedule({});
        props.handleClickClose('schedule')
    }
    let converDataTime = () => {
        let cloneInfor = { ...inforSchedule };
        cloneInfor.data_Time = `${hour}:${min}`;
        setInforSchedule(cloneInfor);
    }
    let handleClickChanges = async () => {
        let check = await checkValidForm();
        if (check.isValid) {
            let resData = await updateSchedule(inforSchedule);
            if (resData && resData.errCode === 0) {
                toast.success(resData.value, { position: toast.POSITION.TOP_RIGHT });
                props.handleClickClose('schedule')
            } else {
                toast.error(resData.value, { position: toast.POSITION.TOP_RIGHT });
                props.handleClickClose('schedule')
            }
        }
    }
    let checkValidForm = async () => {
        let cloneInfor = { ...inforSchedule };
        let positions = ['data_Date', 'data_Time'];
        let arrErr = await checkvalid(cloneInfor, positions);
        await setErr(arrErr);
        return arrErr;
    }
    let handleOnChangesValue = async (event, id) => {
        if (id === 'data_Date') {
            let cloneInfor = { ...inforSchedule };
            cloneInfor[id] = event.target.value;
            setInforSchedule(cloneInfor);
        }
        if (id === 'hour') {
            if (event.target.value >= 24) {
                setHour(24);
            } else {
                setHour(event.target.value);
            }
        }
        if (id === 'minute') {
            if (event.target.value >= 59) {
                setMin(59);
            } else {
                setMin(event.target.value);
            }
        }
    }
    useEffect(() => {
        setInforSchedule(props.inforRegisterHire);
    }, [props.inforRegisterHire])
    useEffect(() => {
        let cloneInfor = { ...inforSchedule };
        cloneInfor.data_Time = `${hour}:${min}`;
        setInforSchedule(cloneInfor);
    }, [hour, min])

    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props
    return (
        <>
            <Modal show={show} onHide={handleClickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="data_Date">Chọn ngày hẹn</Form.Label>
                            <Form.Control id='data_Date' autoComplete="on" type='date' onChange={event => handleOnChangesValue(event, 'data_Date')} />
                            {err.data_Date && err.data_Date.errCode === 1 && <div className='text-danger'>Ngày hẹn không được trống</div>}
                        </Form.Group>
                        <div className='row'>
                            <Form.Group className='col-6'>
                                <Form.Label htmlFor="hour">Giờ</Form.Label>
                                <Form.Control id='hour' autoComplete="on" type='number' min={0} max={23} value={hour || ''} onChange={event => handleOnChangesValue(event, 'hour')} />
                            </Form.Group>
                            <Form.Group className='col-6'>
                                <Form.Label htmlFor="minute">Phút</Form.Label>
                                <Form.Control id='minute' autoComplete="on" type='number' min={0} max={59} value={min || ''} onChange={event => handleOnChangesValue(event, 'minute')} />
                            </Form.Group>
                            {err.data_Time && err.data_Time.errCode === 1 && <div className='text-danger'>Giờ hẹn không được trống</div>}

                        </div>
                    </Form>

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


export default connect(mapStatetoProps, mapDispatchToProps)(ScheduleSeenRoom);
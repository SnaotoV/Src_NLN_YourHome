import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { getNewToken } from '../../services/appServices';
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useEffect, useState } from 'react';
import { checkvalid } from '../../ultils/checkValid';
import { edit } from '../../services/userServices';
import { genderList } from '../../ultils/gender';
let EditUser = (props) => {
    let [user, setUser] = useState({});
    let [err, setErr] = useState({ sValid: false });

    let handleClickClose = async () => {

        setUser(props.userInfor);
        setErr({ sValid: false });
        props.handleClickClose('edit')

    }
    let handleClickChanges = async () => {
        try {

            if (props.isLoggedIn) {
                let arrErr = await checkValidForm();
                if (arrErr.isValid) {
                    let data = await edit(props.userInfor._id, user);
                    if (data && data.errCode === 0) {
                        toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                        props.handleClickClose('edit');
                        props.userLoginSuccess(data.userInfor);
                        setErr({ sValid: false });
                    }
                    else {
                        toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
                    }
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                let check = await getNewToken();
                if (check) {
                    handleClickChanges();
                }
            }
        }
    }
    let checkValidForm = async () => {
        let cloneUser = user;
        let positions = ['CICNumber', 'fullName', 'address', 'phoneNumber', 'birthday', 'gender'];
        let arrErr = await checkvalid(cloneUser, positions);
        await setErr(arrErr);
        return arrErr;
    }
    let handleOnChangesValue = (event, id) => {
        let userClone = { ...user };
        userClone[id] = event.target.value;
        setUser(userClone);

    }

    useEffect(() => {
        if (props.userInfor) {
            setUser(props.userInfor);
        }
    }, [props.userInfor])

    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props;
    return (
        <>
            <Modal show={show} onHide={handleClickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group>
                            <Form.Label htmlFor="CICNumber">
                                Căn cước công dân :
                            </Form.Label>
                            <Form.Control id='CICNumber' placeholder="Căn cước công dân" onChange={event => handleOnChangesValue(event, 'CICNumber')} value={user.CICNumber} ></Form.Control>
                            {err['CICNumber'] && err['CICNumber'].errCode === 1 && <div className='text-danger'>Căn cước không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="fullName">
                                Họ và tên :
                            </Form.Label>
                            <Form.Control id='fullName' placeholder="Họ và tên người dùng" onChange={event => handleOnChangesValue(event, 'fullName')} value={user.fullName}></Form.Control>
                            {err['fullName'] && err['fullName'].errCode === 1 && <div className='text-danger'>Họ và tên không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="address">
                                Địa chỉ :
                            </Form.Label>
                            <Form.Control id='address' placeholder="Địa chỉ" onChange={event => handleOnChangesValue(event, 'address')} value={user.address}></Form.Control>
                            {err['address'] && err['address'].errCode === 1 && <div className='text-danger'>Địa chỉ không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="phoneNumber">
                                Số điện thoại :
                            </Form.Label>
                            <Form.Control id='phoneNumber' type='number' placeholder="Số điện thoại" onChange={event => handleOnChangesValue(event, 'phoneNumber')} value={user.phoneNumber} ></Form.Control>
                            {err['phoneNumber'] && err['phoneNumber'].errCode === 1 && <div className='text-danger' >Số điện thoại không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="birthday">
                                Ngày sinh :
                            </Form.Label>
                            <Form.Control id='birthday' type='date' placeholder="Ngày sinh" onChange={event => handleOnChangesValue(event, 'birthday')} value={user.birthday} ></Form.Control>
                            {err['birthday'] && err['birthday'].errCode === 1 && <div className='text-danger' >Ngày sinh không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="gender">
                                Giới tính:
                            </Form.Label>
                            <div className='text-center'>
                                {genderList && genderList.map((item) => {
                                    return (
                                        <Form.Check key={item.genderId} name='gender' id={`gender-${item.genderId}`} checked={Number(user.gender) === item.genderId} inline type='radio' label={item.gender} value={item.genderId} onChange={event => handleOnChangesValue(event, 'gender')} ></Form.Check>
                                    )

                                })}
                            </div>
                            {err['gender'] && err['gender'].errCode === 1 && <div className='text-danger' >Giới tính không được trống</div>}
                        </Form.Group>
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
            </Modal >
        </>
    )
}
const mapStatetoProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(EditUser);
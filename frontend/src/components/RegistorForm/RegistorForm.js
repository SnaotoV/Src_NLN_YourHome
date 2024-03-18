import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useState } from 'react';
import { register } from '../../services/appServices';
import { checkvalid } from '../../ultils/checkValid';

let RegistorForm = (props) => {
    let [user, setUser] = useState({});
    let [err, setErr] = useState({ sValid: false });
    let handleClickClose = () => {
        setUser({});
        setErr({});
        props.handleClickClose('register')
    }
    let handleClickChanges = async () => {
        let arrErr = await checkValidForm();
        if (arrErr.isValid === true) {
            let data = await register(user);
            if (data.errCode === 0) {
                toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                props.handleClickClose('register')
                setUser({});
                setErr({ sValid: false });
            } else
                toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
        }
    }
    let checkValidForm = async () => {
        let cloneUser = user;
        let positions = ['CICNumber', 'username', 'password', 'fullName', 'address', 'phoneNumber', 'birthday', 'gender'];
        let arrErr = await checkvalid(cloneUser, positions);
        await setErr(arrErr);
        return arrErr;
    }
    let handleOnChangesValue = async (event, id) => {
        let cloneUser = user;
        cloneUser[id] = event.target.value;
        setUser(cloneUser);
    }
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
                            <Form.Label htmlFor="username">
                                Tài Khoản:
                            </Form.Label>
                            <Form.Control id='username' placeholder="Tài Khoản" onChange={event => handleOnChangesValue(event, 'username')} ></Form.Control>
                            {err['username'] && err['username'].errCode === 1 && <div className='text-danger'>Tài khoản không được trống</div>}
                            <>{user.username}</>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">
                                Mật khẩu:
                            </Form.Label>
                            <Form.Control id='password' autoComplete="on" type='password' placeholder="Mật khẩu" onChange={event => handleOnChangesValue(event, 'password')}></Form.Control>
                            {err['password'] && err['password'].errCode === 1 && <div className='text-danger'>Mật khẩu không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="CICNumber">
                                Căn cước công dân:
                            </Form.Label>
                            <Form.Control id='CICNumber' placeholder="Căn cước công dân" onChange={event => handleOnChangesValue(event, 'CICNumber')}></Form.Control>
                            {err['CICNumber'] && err['CICNumber'].errCode === 1 && <div className='text-danger'>Căn cước không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="fullName">
                                Họ và tên:
                            </Form.Label>
                            <Form.Control id='fullName' placeholder="Họ và tên người dùng" onChange={event => handleOnChangesValue(event, 'fullName')}></Form.Control>
                            {err['fullName'] && err['fullName'].errCode === 1 && <div className='text-danger'>Họ và tên không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="address">
                                Địa chỉ:
                            </Form.Label>
                            <Form.Control id='address' placeholder="Địa chỉ" onChange={event => handleOnChangesValue(event, 'address')}></Form.Control>
                            {err['address'] && err['address'].errCode === 1 && <div className='text-danger'>Địa chỉ không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="phoneNumber">
                                Số điện thoại:
                            </Form.Label>
                            <Form.Control id='phoneNumber' type='number' placeholder="Số điện thoại" onChange={event => handleOnChangesValue(event, 'phoneNumber')} ></Form.Control>
                            {err['phoneNumber'] && err['phoneNumber'].errCode === 1 && <div className='text-danger' >Số điện thoại không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="birthday">
                                Ngày sinh:
                            </Form.Label>
                            <Form.Control id='birthday' type='date' placeholder="Ngày sinh" onChange={event => handleOnChangesValue(event, 'birthday')} ></Form.Control>
                            {err['birthday'] && err['birthday'].errCode === 1 && <div className='text-danger' >Ngày sinh không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="gender">
                                Giới tính:
                            </Form.Label>
                            <div className='text-center'>
                                <Form.Check name='gender' id='gender-0' inline type='radio' label='Nữ' value='0' onChange={event => handleOnChangesValue(event, 'gender')} ></Form.Check>
                                <Form.Check name='gender' id='gender-1' inline type='radio' label='Nam' value='1' onChange={event => handleOnChangesValue(event, 'gender')} ></Form.Check>
                                <Form.Check name='gender' id='gender-2' inline type='radio' label='Khác' value='2' onChange={event => handleOnChangesValue(event, 'gender')} ></Form.Check>
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
            </Modal>
        </>
    )
}
const mapStatetoProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(RegistorForm);
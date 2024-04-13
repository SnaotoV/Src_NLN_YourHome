import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useState } from 'react';
import { login } from '../../services/appServices';
import { checkvalid } from '../../ultils/checkValid';

let LoginForm = (props) => {
    let [user, setUser] = useState({})
    let [err, setErr] = useState({ isValid: false });

    let handleClickClose = () => {
        setUser({});
        setErr({ isValid: false });
        props.handleClickClose('login')
    }
    let handleClickChanges = async () => {
        let arrErr = await checkValidForm();
        if (arrErr.isValid === true) {
            let data = await login(user);
            if (data.errCode === 0) {
                console.log(data);
                toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                setUser({});
                setErr({ isValid: false });
                props.userLoginSuccess(data.userData);
                props.handleClickClose('login')
            } else
                toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
        }
    }
    let checkValidForm = async () => {
        let cloneUser = user;
        let positions = ['username', 'password'];
        let arrErr = await checkvalid(cloneUser, positions);
        await setErr(arrErr)
        return arrErr

    }
    let handleOnChangesValue = async (event, id) => {
        let cloneUser = { ...user };
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
                            <Form.Control id='username' placeholder="Tài Khoản" onChange={event => handleOnChangesValue(event, 'username')}></Form.Control>
                            {err['username'] && err['username'].errCode === 1 && <div className='text-danger'>Tài khoản không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">
                                Mật khẩu:
                            </Form.Label>
                            <Form.Control id='password' autoComplete="on" type='password' placeholder="Mật khẩu" onChange={event => handleOnChangesValue(event, 'password')}></Form.Control>
                            {err['password'] && err['password'].errCode === 1 && <div className='text-danger'>Mật khẩu không được trống</div>}
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
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(LoginForm);
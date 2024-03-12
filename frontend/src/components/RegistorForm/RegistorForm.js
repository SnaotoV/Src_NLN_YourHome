import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useState } from 'react';
import { register } from '../../services/appServices';


let RegistorForm = (props) => {
    let [user, setUser] = useState({})
    let handleClickClose = () => {
        setUser({});
        props.handleClickClose('register')
    }
    let handleClickChanges = async () => {
        register(user);
    }
    let handleOnChangesValue = (event, id) => {
        let cloneUser = user;
        cloneUser[id] = event.target.value;
        setUser(cloneUser)
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
                                Tài Khoản :
                            </Form.Label>
                            <Form.Control id='username' placeholder="Tài Khoản" onChange={event => handleOnChangesValue(event, 'username')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">
                                Mật khẩu :
                            </Form.Label>
                            <Form.Control id='password' autoComplete="on" type='password' placeholder="Mật khẩu" onChange={event => handleOnChangesValue(event, 'password')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="CICNumber">
                                Căn cước công dân :
                            </Form.Label>
                            <Form.Control id='CICNumber' placeholder="Căn cước công dân" onChange={event => handleOnChangesValue(event, 'CICNumber')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="fullName">
                                Họ và tên :
                            </Form.Label>
                            <Form.Control id='fullName' placeholder="Họ và tên người dùng" onChange={event => handleOnChangesValue(event, 'fullName')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="address">
                                Địa chỉ :
                            </Form.Label>
                            <Form.Control id='address' placeholder="Địa chỉ" onChange={event => handleOnChangesValue(event, 'address')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="address">
                                Số điện thoại :
                            </Form.Label>
                            <Form.Control id='phoneNumber' placeholder="Số điện thoại" onChange={event => handleOnChangesValue(event, 'phoneNumber')}></Form.Control>
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
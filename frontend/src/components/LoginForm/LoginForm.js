import { connect } from 'react-redux';
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import * as actions from '../../stores/actions'
import { useState } from 'react';

let LoginForm = (props) => {
    let [user, setUser] = useState({})
    let handleClickClose = () => {
        setUser({});
        props.handleClickClose('login')
    }
    let handleClickChanges = async () => {
        console.log(user);
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
                                Username :
                            </Form.Label>
                            <Form.Control id='username' placeholder="Tài Khoản" onChange={event => handleOnChangesValue(event, 'username')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">
                                Password :
                            </Form.Label>
                            <Form.Control id='password' autoComplete="on" type='password' placeholder="Mật khẩu" onChange={event => handleOnChangesValue(event, 'password')}></Form.Control>
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
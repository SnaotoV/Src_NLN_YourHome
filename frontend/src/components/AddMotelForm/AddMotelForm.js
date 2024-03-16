import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

let AddMotelForm = (props) => {
    let [motel, setMotel] = useState({});
    let [err, setErr] = useState({ isValid: false });

    let handleClickClose = () => {
        props.handleClickClose('add-motel')
    }
    let handleClickChanges = () => {
        console.log('hello');
    }
    let handleOnChangesValue = async (event, id) => {
        let cloneMotel = motel;
        cloneMotel[id] = event.target.value;
        setMotel(cloneMotel);
    }
    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props

    return (
        <div>
            <Modal show={show} onHide={handleClickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="motelName">
                                Tên dãy trọ:
                            </Form.Label>
                            <Form.Control id='motelName' placeholder="Tên dãy trọ" onChange={event => handleOnChangesValue(event, 'motelName')}></Form.Control>
                            {err['motelName'] && err['motelName'].errCode === 1 && <div className='text-danger'>Tên dãy trọ không được trống</div>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="address">
                                Địa chỉ:
                            </Form.Label>
                            <Form.Control id='address' autoComplete="on" type='address' placeholder="Địa chỉ" onChange={event => handleOnChangesValue(event, 'address')}></Form.Control>
                            {err['address'] && err['address'].errCode === 1 && <div className='text-danger'>Mật khẩu không được trống</div>}
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
        </div>
    )
}

export default AddMotelForm
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import '../../styles/AddMotelForm/AddMotelForm.scss';
import { Autocomplete, TextField } from '@mui/material';
import { tinh } from "../../ultils/tinh_tp";
import handleImgType from "../../ultils/getImgFromBase64";

let AddMotelForm = (props) => {
    let [motel, setMotel] = useState({});
    let [images, setImages] = useState([]);
    let [err, setErr] = useState({ isValid: false });
    let handleClickClose = () => {
        setMotel({})
        setImages({})
        props.handleClickClose('add-motel')
    }
    let handleClickChanges = () => {
        console.log(motel);
    }

    let handleOnChangesValue = async (event, id, values) => {
        if (!values) {
            let cloneMotel = motel;
            cloneMotel[id] = event.target.value;
            setMotel(cloneMotel);
        }
        else {
            let cloneMotel = motel;
            cloneMotel[id] = values;
            setMotel(cloneMotel);
        }
    }
    let handleOnChangesImg = async (event) => {
        let data = event.target.files;
        let fileImg = data;
        let listImage = [];
        if (fileImg && fileImg.length > 0) {
            for (let i = 0; i < fileImg.length; i++) {
                let ImageBase64 = await handleImgType.getBase64(fileImg[i]);
                listImage = [...listImage, ImageBase64];
            }
            if (listImage.length > 0) {
                let cloneMotel = { ...motel };
                cloneMotel['listImage'] = listImage;
                setMotel(cloneMotel);
                setImages(listImage);
            }
        }

    }
    let handleBtn = async (index, type) => {
        let listImage = [...images];
        if (type === 'delete') {
            let prefLength = listImage.length;
            await listImage.splice(index, 1)
            if (prefLength !== listImage.length) {
                let cloneMotel = { ...motel };
                cloneMotel['listImage'] = listImage;
                setMotel(cloneMotel);
                setImages(listImage);
            }

        }
    }
    let { show, modalName, modalBtnClose, modalBtnChanges, modalClose, modalChanges } = props
    return (
        <div>
            <Modal show={show} onHide={handleClickClose} size={images.length > 0 ? 'xl' : ''}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className="row">
                        <div className={images.length > 0 ? 'col-6' : 'col-12'}>
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
                                <Form.Control id='address' autoComplete="on" type='text' placeholder="Địa chỉ" onChange={event => handleOnChangesValue(event, 'address')}></Form.Control>
                                {err['address'] && err['address'].errCode === 1 && <div className='text-danger'>Địa chỉ không được trống</div>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="City">
                                    Tỉnh:
                                </Form.Label>
                                <Autocomplete
                                    onChange={(event, values) => handleOnChangesValue(event, 'province', values)}
                                    id="province"
                                    autoSelect={true}
                                    sx={{ width: 300 }} options={tinh ? tinh : []}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Tỉnh" />}></Autocomplete>
                                {err['province'] && err['province'].errCode === 1 && <div className='text-danger'>Địa chỉ không được trống</div>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="quantity">
                                    Số lượng phòng:
                                </Form.Label>
                                <Form.Control id='quantity' autoComplete="on" type='number' placeholder="Số lượng phòng" min={1} onChange={event => handleOnChangesValue(event, 'quantity')}></Form.Control>
                                {err['quantity'] && err['quantity'].errCode === 1 && <div className='text-danger'>Số lượng không phòng được trống</div>}
                            </Form.Group>
                            <div className="row my-2">
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="vertical">
                                        Chiều dài:
                                    </Form.Label>
                                    <Form.Control id='vertical' autoComplete="on" type='number' placeholder="Chiều dài " min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'vertical')}></Form.Control>
                                    {err['vertical'] && err['vertical'].errCode === 1 && <div className='text-danger'> Chiều dài không được trống</div>}
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="horizontal">
                                        Chiều rộng:
                                    </Form.Label>
                                    <Form.Control id='horizontal' autoComplete="on" type='number' placeholder="Chiều rộng" min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'horizontal')}></Form.Control>
                                    {err['horizontal'] && err['horizontal'].errCode === 1 && <div className='text-danger'> Chiều rộng không được trống</div>}
                                </Form.Group>
                            </div>
                            <Form.Group>
                                <Form.Label htmlFor="price">
                                    Giá phòng:
                                </Form.Label>
                                <Form.Control id='priceEW' autoComplete="on" type='number' placeholder="Giá phòng" min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'price')}></Form.Control>
                                {err['priceEW'] && err['priceEW'].errCode === 1 && <div className='text-danger'>Giá phòng không được trống</div>}
                            </Form.Group>
                            <div className="row my-2">
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="priceE">
                                        Giá điện:
                                    </Form.Label>
                                    <Form.Control id='priceE' autoComplete="on" type='number' placeholder="Giá điện " min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'priceE')}></Form.Control>
                                    {err['priceE'] && err['priceE'].errCode === 1 && <div className='text-danger'> Giá điện không được trống</div>}
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="priceW">
                                        Giá nước:
                                    </Form.Label>
                                    <Form.Control id='priceW' autoComplete="on" type='number' placeholder="Giá nước " min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'priceW')}></Form.Control>
                                    {err['priceW'] && err['priceW'].errCode === 1 && <div className='text-danger'> Giá nước không được trống</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="image">
                                        Hình ảnh:
                                    </Form.Label>
                                    <Form.Control type="file" multiple placeholder="Thêm file ảnh" id="image" onChange={event => handleOnChangesImg(event)}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className={images.length > 0 ? 'col-6' : 'col-12'}>
                            {images && images.length > 0 &&
                                < Form.Group className="row">
                                    {images.map((item, index) => {
                                        return (
                                            <div className="col-4 row" key={index} >
                                                <img src={item} alt='test' className="motel-img"></img>
                                                <Button className="btn-danger col m-2" onClick={() => handleBtn(index, 'delete')}>Xóa</Button>
                                            </div>
                                        )
                                    })}
                                </Form.Group>
                            }
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
        </div >
    )
}

export default AddMotelForm
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import '../../styles/AddMotelForm/AddMotelForm.scss';
import { Autocomplete, TextField } from '@mui/material';
import { tinh } from "../../ultils/tinh_tp";
import classPhuongXa from "../../ultils/xa_phuong";
import classHuyenQuan from "../../ultils/quan_huyen";
import handleImgType from "../../ultils/getImgFromBase64";
import { checkvalid } from "../../ultils/checkValid";
import { addMotel } from "../../services/userServices";
import { connect } from "react-redux";
import { toast } from "react-toastify";
let AddMotelForm = (props) => {
    let [motel, setMotel] = useState({ userId: props.userInfor ? props.userInfor._id : '' });
    let [images, setImages] = useState([]);
    let [err, setErr] = useState({ isValid: false });
    let [QuanHuyen, setQuanHuyen] = useState([]);
    let [XaPhuong, setXaPhuong] = useState([]);
    let handleClickClose = () => {
        setMotel({ userId: props.userInfor._id })
        setImages([]);
        setErr({});
        props.handleClickClose('add-motel')
    }
    let handleClickChanges = async () => {
        let arrErr = await checkValidForm();
        if (arrErr.isValid === true) {
            let data = await addMotel(motel);
            if (data && data.errCode === 0) {
                toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                console.log(data);
                props.handleClickChanges('add-motel');
                setMotel({ userId: props.userInfor._id });
                setErr({ sValid: false });
                setImages([]);
            }
            else {
                toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
            }
        }
    }
    let checkValidForm = async () => {
        let cloneMotel = motel;
        let positions = ['name', 'quantity', 'price', 'priceE', 'priceW', 'vertical', 'horizontal', 'province', 'district', 'ward', 'address'];
        let arrErr = await checkvalid(cloneMotel, positions);
        await setErr(arrErr);
        return arrErr;
    }
    let handleOnChangesValue = async (event, id, values) => {
        if (!values) {
            let cloneMotel = { ...motel };
            cloneMotel[id] = event.target.value;
            setMotel(cloneMotel);
        }
        else {
            if (id === 'province') {
                let data = await classHuyenQuan.getQuanHuyen(values)
                setQuanHuyen(data);
            }
            if (id === 'district') {
                let data = await classPhuongXa.getXaPhuong(values)
                setXaPhuong(data)
            }
            let cloneMotel = { ...motel };
            cloneMotel[id] = values ? values : event.target.value;
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
            <Modal show={show} onHide={handleClickClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className="row">
                        <div className='col-12' >
                            <div className="row">
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="name">
                                        Tên dãy trọ:
                                    </Form.Label>
                                    <Form.Control id='name' placeholder="Tên dãy trọ" onChange={event => handleOnChangesValue(event, 'name')}></Form.Control>
                                    {err['name'] && err['name'].errCode === 1 && <div className='text-danger'>Tên dãy trọ không được trống</div>}
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="address">
                                        Địa chỉ:
                                    </Form.Label>
                                    <Form.Control id='address' autoComplete="on" type='text' placeholder="Địa chỉ" onChange={event => handleOnChangesValue(event, 'address')}></Form.Control>
                                    {err.address && err.address.errCode === 1 && <div className='text-danger'>Địa chỉ không được trống</div>}
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Form.Group className="col-4">
                                    <Form.Label htmlFor="City">
                                        Tỉnh:
                                    </Form.Label>
                                    <Autocomplete
                                        size="small"
                                        fullWidth={true}
                                        onChange={(event, values) => handleOnChangesValue(event, 'province', values)}
                                        id="province"
                                        autoSelect={true}
                                        sx={{ width: 300 }} options={tinh ? tinh : []}
                                        getOptionLabel={(option) => option.name_with_type}
                                        renderInput={(params) => <TextField {...params} label="Tỉnh" />}></Autocomplete>
                                    {err.province && err.province.errCode === 1 && <div className='text-danger'>Tỉnh không được trống</div>}
                                </Form.Group>
                                <Form.Group className="col-4">
                                    <Form.Label htmlFor="district">
                                        Quận hoặc Huyện:
                                    </Form.Label>
                                    <Autocomplete
                                        size="small"
                                        fullWidth={true}
                                        onChange={(event, values) => handleOnChangesValue(event, 'district', values)}
                                        id="district"
                                        autoSelect={true}
                                        sx={{ width: 300 }} options={QuanHuyen ? QuanHuyen : []}
                                        getOptionLabel={(option) => option.name_with_type}
                                        renderInput={(params) => <TextField {...params} label="Quận hoặc Huyện:" />}></Autocomplete>
                                    {err.district && err.district.errCode === 1 && <div className='text-danger'>Quận hoặc Huyện không được trống</div>}
                                </Form.Group >
                                <Form.Group className="col-4">
                                    <Form.Label htmlFor="ward">
                                        Xã hoặc Phường:
                                    </Form.Label>
                                    <Autocomplete
                                        size="small"
                                        fullWidth={true}
                                        onChange={(event, values) => handleOnChangesValue(event, 'ward', values)}
                                        id="ward"
                                        autoSelect={true}
                                        sx={{ width: 300 }} options={XaPhuong ? XaPhuong : []}
                                        getOptionLabel={(option) => option.name_with_type}
                                        renderInput={(params) => <TextField {...params} label="Xã hoặc Phường:" />}></Autocomplete>
                                    {err.ward && err.ward.errCode === 1 && <div className='text-danger'>Xã hoặc Phường không được trống</div>}
                                </Form.Group>
                            </div>
                            <Form.Group>
                                <Form.Label htmlFor="quantity">
                                    Số lượng phòng:
                                </Form.Label>
                                <Form.Control id='quantity' autoComplete="on" type='number' placeholder="Số lượng phòng" min={1} max={40} onChange={event => handleOnChangesValue(event, 'quantity')}></Form.Control>
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
                                <Form.Control id='price' autoComplete="on" type='number' placeholder="Giá phòng" min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'price')}></Form.Control>
                                {err['price'] && err['price'].errCode === 1 && <div className='text-danger'>Giá phòng không được trống</div>}
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
                        <div className='col-12' >
                            {images && images.length > 0 &&
                                < Form.Group className="row">
                                    {images.map((item, index) => {
                                        return (
                                            <div className="col-2 row" key={index} >
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
const mapStatetoProps = state => {
    return {
        userInfor: state.user.userInfor
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(AddMotelForm);
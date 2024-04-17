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
import { updateMotel } from "../../services/userServices";
let EditModelForm = (props) => {
    let [motel, setMotel] = useState({ userId: props.userInfor ? props.userInfor._id : '' });
    let [images, setImages] = useState([]);
    let [deleteImages, setDeleteImgages] = useState([]);
    let [err, setErr] = useState({ isValid: false });
    let [QuanHuyen, setQuanHuyen] = useState([]);
    let [XaPhuong, setXaPhuong] = useState([]);
    let handleClickClose = () => {
        setMotel(props.motel);
        setImages(motel.image);
        setErr({});
        props.handleClickClose('edit')
    }
    let handleClickChanges = async () => {

        let cloneMotel = {
            ...motel,
            deleteImages
        }
        let arrErr = await checkValidForm();
        if (arrErr.isValid === true) {
            let data = await updateMotel('admin', cloneMotel);
            if (data && data.errCode === 0) {
                toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                props.refrestData(cloneMotel);
                console.log(cloneMotel);
                handleClickClose();
            }
            else {
                toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
                handleClickClose()

            }
        }
    }
    let checkValidForm = async () => {
        let cloneMotel = { ...motel };
        let positions = ['priceE', 'priceW'];
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
                let ImageObject = {
                    image: ImageBase64,
                    IdParent: motel._id,
                    type: 'motel',
                    create_at: new Date(),
                    update_at: null,
                }
                listImage = [...listImage, ImageObject];
            }
            if (listImage.length > 0 && images.length === 0) {
                let cloneMotel = { ...motel };
                cloneMotel['listImage'] = listImage;
                setMotel(cloneMotel);
                setImages(listImage);
            } else {
                let cloneMotel = { ...motel };
                let clonelistImage = [...images, ...listImage];
                cloneMotel['listImage'] = clonelistImage
                setMotel(cloneMotel);
                setImages(clonelistImage);
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
            let cloneListDelete = [...deleteImages, images[index]];
            setDeleteImgages(cloneListDelete)
        }
    }

    useEffect(() => {
        let cloneMotel = props.motel;
        if (cloneMotel) {
            cloneMotel.priceE = props.motel && props.motel.priceEW ? props.motel.priceEW[0].priceE : 0
            cloneMotel.priceW = props.motel && props.motel.priceEW ? props.motel.priceEW[0].priceW : 0
            setMotel(cloneMotel);
        }
    }, [props.motel])
    useEffect(() => {
        let cloneMotel = { ...motel };
        if (cloneMotel) {
            setImages(motel.listImage ? motel.listImage : motel.image);
        }
    }, [motel])

    // console.log(motel);
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
                            <Form.Group>
                                <Form.Label htmlFor="price">
                                    Giá phòng:
                                </Form.Label>
                                <Form.Control id='price' autoComplete="on" type='number' value={motel.price || ''} placeholder="Giá phòng" min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'price')}></Form.Control>
                                {err['price'] && err['price'].errCode === 1 && <div className='text-danger'>Giá phòng không được trống</div>}
                            </Form.Group>
                            <div className="row my-2">
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="priceE">
                                        Giá điện:
                                    </Form.Label>
                                    <Form.Control id='priceE' autoComplete="on" type='number' value={motel.priceE || ''} placeholder="Giá điện " min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'priceE')}></Form.Control>
                                    {err['priceE'] && err['priceE'].errCode === 1 && <div className='text-danger'> Giá điện không được trống</div>}
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label htmlFor="priceW">
                                        Giá nước:
                                    </Form.Label>
                                    <Form.Control id='priceW' autoComplete="on" type='number' value={motel.priceW || ''} placeholder="Giá nước " min={1000} step={1000} onChange={event => handleOnChangesValue(event, 'priceW')}></Form.Control>
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
                                                <img src={item.image} alt='test' className="motel-img"></img>
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


export default connect(mapStatetoProps, mapDispatchToProps)(EditModelForm);
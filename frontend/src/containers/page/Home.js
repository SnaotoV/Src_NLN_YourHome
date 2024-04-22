import '../../styles/Container/Home.scss';
import image from '../../assets/image/60380.jpg';
import { Form, Button, Card, Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { tinh } from "../../ultils/tinh_tp";
import classPhuongXa from "../../ultils/xa_phuong";
import classHuyenQuan from "../../ultils/quan_huyen";
import { connect } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDataInPage } from '../../services/appServices';
import * as actions from '../../stores/actions'
import { withRouter } from 'react-router-dom';
let Home = (props) => {
    let [motels, setMotels] = useState({});
    let [user, setUser] = useState({});
    let [QuanHuyen, setQuanHuyen] = useState([]);
    let [XaPhuong, setXaPhuong] = useState([]);
    let [filter, setFilter] = useState({});
    let handleClick = async (type) => {
        if (type === 'search') {
            await fetchData();
        }
        if (type === 'reset') {
            setFilter({});
            setXaPhuong([]);
            setQuanHuyen([]);
        }
    }


    let fetchData = async () => {
        if (Object.keys(filter).length !== 0) {
            await props.userFilter(filter);
            props.history.replace('/Motel/1');
        }
    }
    let handleOnChangesValue = async (event, id, values) => {
        if (!values) {
            let cloneMotel = { ...filter };
            cloneMotel[id] = event.target.value;
            setFilter(cloneMotel);
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
            let cloneMotel = { ...filter };
            cloneMotel[id] = values ? values : event.target.value;
            setFilter(cloneMotel);
        }
    }
    useEffect(() => {
        let getData = async () => {
            let data = await getDataInPage('motel-home', 1)
            if (data) {
                setMotels(data.data)
            }
        }
        getData()
    }, [])
    useEffect(() => {
        setUser(props.userInfor)
    }, [props.userInfor])
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1000} >
                    <div className="">
                        <img className="w-100 slide-image" src={image} alt="Hình ảnh đại diện sản phẩm"></img>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000} >
                    <div className="">
                        <img className="w-100 slide-image" src={image} alt="Hình ảnh đại diện sản phẩm"></img>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000} >
                    <div className="">
                        <img className="w-100 slide-image" src={image} alt="Hình ảnh đại diện sản phẩm"></img>
                    </div>
                </Carousel.Item>
            </Carousel>
            <div className="">
                <Form className="row main-title p-4">
                    <div className="row col-12">
                        <Form.Group className="col-3">
                            <Form.Label htmlFor="City">
                                Tỉnh:
                            </Form.Label>
                            <Autocomplete
                                size="small"
                                className="bg-white "
                                fullWidth={true}
                                onChange={(event, values) => handleOnChangesValue(event, 'province', values)}
                                id="province"
                                autoSelect={true}
                                sx={{ width: 300 }} options={tinh ? tinh : []}
                                getOptionLabel={(option) => option.name_with_type}
                                renderInput={(params) => <TextField {...params} label="Tỉnh" />}></Autocomplete>
                        </Form.Group>
                        <Form.Group className="col-3">
                            <Form.Label htmlFor="district">
                                Quận hoặc Huyện:
                            </Form.Label>
                            <Autocomplete
                                size="small"
                                className="bg-white "
                                fullWidth={true}
                                onChange={(event, values) => handleOnChangesValue(event, 'district', values)}
                                id="district"
                                autoSelect={true}
                                sx={{ width: 300 }} options={QuanHuyen ? QuanHuyen : []}
                                getOptionLabel={(option) => option.name_with_type}
                                renderInput={(params) => <TextField {...params} label="Quận hoặc Huyện:" />}></Autocomplete>
                        </Form.Group >
                        <Form.Group className="col-3">
                            <Form.Label htmlFor="ward">
                                Xã hoặc Phường:
                            </Form.Label>
                            <Autocomplete
                                size="small"
                                className="bg-white "
                                fullWidth={true}
                                onChange={(event, values) => handleOnChangesValue(event, 'ward', values)}
                                id="ward"
                                autoSelect={true}
                                sx={{ width: 300 }} options={XaPhuong ? XaPhuong : []}
                                getOptionLabel={(option) => option.name_with_type}
                                renderInput={(params) => <TextField {...params} label="Xã hoặc Phường:" />}></Autocomplete>
                        </Form.Group>
                    </div>
                    <div className="row ">
                        <Form.Group className="col-12">
                            <Form.Label htmlFor="name">
                                Tìm kiếm theo tên trong khu vực:
                            </Form.Label>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Control id='name' placeholder="Tìm kiếm" onChange={event => handleOnChangesValue(event, 'name')} value={filter.name || ''}></Form.Control>
                                </div>
                                <Button onClick={() => handleClick('search')} className="col-2 mx-1">Tìm kiếm</Button>
                                <Button type="reset" onClick={() => handleClick('reset')} className="col-2 btn-danger mx-1">Hủy</Button>
                            </div>
                        </Form.Group>
                    </div>
                </Form >
            </div>
            <div className='h2 text-center m-4'>Phòng trống nổi bật</div>
            <div className='cart-box mx-3 row'>
                {motels && motels.length > 0 && motels.map((item, index) => {

                    return (
                        <div className="col-3" key={index}>
                            <Card>
                                <Card.Img className="w-100 card-img" variant="top" src={item.image.length > 0 && item?.image[0].image} />
                                <Card.Body>
                                    <Card.Title className=" title-text">{item.name}</Card.Title>
                                    <Card.Text>
                                        Chiều dài: {item.horizontal}m
                                        <br />
                                        Chiều rộng: {item.vertical}m
                                        <br />
                                        {item.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND/tháng
                                    </Card.Text>
                                    <Link className='btn btn-dark text-white' to={(user && user._id === item.userId) ? `/User/Motel/${item._id}/1` : `/Detail/Motel/${item._id}`}>Xem chi tiết</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}
const mapStatetoProps = state => {
    return {
        userInfor: state.user.userInfor
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userFilter: (filter) => dispatch(actions.filterMotel(filter))
    }
}
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Home));
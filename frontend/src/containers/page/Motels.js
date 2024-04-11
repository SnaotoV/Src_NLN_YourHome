import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { Form, Button, Modal, Card } from "react-bootstrap";
import { Autocomplete, TextField } from '@mui/material';
import { tinh } from "../../ultils/tinh_tp";
import classPhuongXa from "../../ultils/xa_phuong";
import classHuyenQuan from "../../ultils/quan_huyen";
import { getQuantityPage, getDataInPage } from "../../services/appServices";
import { Link, withRouter } from 'react-router-dom';
import Pagenated from '../../components/Pagenated/Pagenated';
import '../../styles/Motel/Motel.scss';
let Motel = (props) => {
    let [filter, setFilter] = useState({});
    let [QuanHuyen, setQuanHuyen] = useState([]);
    let [XaPhuong, setXaPhuong] = useState([]);
    let [page, setPage] = useState(1);
    let [listMotel, setListMotel] = useState([]);
    let [quantityPage, setQuantityPage] = useState(1);
    let [user, setUser] = useState({});
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
    let fetchData = async () => {
        let clonePage = page;
        let cloneFilter = filter;
        let cloneListMotel = await getDataInPage('motel', clonePage, cloneFilter);
        let quantityPageFromBE = await getQuantityPage('motel', 10);
        setListMotel(cloneListMotel.data);
        setQuantityPage(quantityPageFromBE);
    }
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
    useEffect(() => {
        let getData = async () => {
            let clonePage = page
            let cloneFilter = filter
            let cloneListMotel = await getDataInPage('motel', clonePage);
            let quantityPageFromBE = await getQuantityPage('motel', 10, cloneFilter);
            setListMotel(cloneListMotel.data);
            setQuantityPage(quantityPageFromBE);
        }
        getData()
    }, [])
    useEffect(() => {
        setUser(props.userInfor)
    }, [props.userInfor])
    return (
        <div>
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
            <div className="container p-3">
                <div className="row">
                    {listMotel && listMotel.length > 0 && listMotel.map((item, index) => {

                        return (
                            <div className="col-4" key={index}>
                                <Card>
                                    <Card.Img className="w-100 card-img" variant="top" src={item.image[0].image} />
                                    <Card.Body>
                                        <Card.Title className=" title-text">{item.name}</Card.Title>
                                        <Card.Text>
                                            Chiều dài: {item.horizontal}m
                                            <br />
                                            Chiều rộng: {item.vertical}m
                                            <br />
                                            {item.price} VND/tháng
                                        </Card.Text>
                                        <Link className='btn btn-dark text-white' to={user._id === item.userId ? `/User/Motel/${item._id}/1` : `/Detail/Motel/${item._id}`}>Xem chi tiết</Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            <Pagenated
                quantityPage={quantityPage}
                className="d-flex justify-content-center"
            ></Pagenated>
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
export default connect(mapStatetoProps, mapDispatchToProps)(Motel);
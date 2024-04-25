import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { getQuantityPage, getDataInPage } from "../../services/appServices";
import { deleteMotel } from "../../services/userServices";
import Pagenated from "../Pagenated/Pagenated";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
let MotelContent = (props) => {
    let [listMotel, setListMotel] = useState([]);
    let [page, setPage] = useState(1);
    let [quantityPage, setQuantityPage] = useState(1);
    let [user, setUser] = useState({ ...props.userInfor });

    let handleButton = async (type, motel, index) => {
        if (type === 'delete-motel') {
            let data = await deleteMotel('admin', motel);
            if (data && data.errCode === 0) {
                toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                removeMotelInList(index);
            } else {
                toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
            }
        }
    }

    let removeMotelInList = (index) => {
        let cloneListMotel = [...listMotel];
        cloneListMotel.splice(index, 1);
        setListMotel(cloneListMotel);
    }

    useEffect(() => {
        let getData = async () => {
            let clonePage = page;
            let filter = {
                userId: user ? user._id : ''
            }
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('motel', clonePage, 10, filter);
                let quantityPageFromBE = await getQuantityPage('motel', 10, filter);
                setListMotel(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData()
    }, []);
    useEffect(() => {
        let getData = async () => {
            let clonePage = page
            let filter = {
                userId: user ? user._id : ''
            }
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('motel', clonePage, 10, filter);
                let quantityPageFromBE = await getQuantityPage('motel', 10, filter);
                setListMotel(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData()
    }, [props.checkGetData, user, page]);

    useEffect(() => {
        let clonePage = props.match.params.page;
        setUser(props.userInfor);
        setPage(clonePage);
    }, [props.match.params.page, props.userInfor])
    return (
        <div>
            <div>Danh sách nhà trọ</div>
            <div className="contentBox">
                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên dãy trọ</th>
                            <th>Số lượng phòng</th>
                            <th>Chiều rộng</th>
                            <th>Chiều dài</th>
                            <th>Giá</th>
                            <th>Số nhà</th>
                            <th>Phường/Xã</th>
                            <th>Quận/Huyện</th>
                            <th>Tỉnh/Thành Phố</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listMotel && listMotel.length > 0 && listMotel.map((item, index) => {
                                return (
                                    <tr className="text-center" key={index}>
                                        <td >{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.horizontal} m</td>
                                        <td>{item.vertical}m</td>
                                        <td>{item.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                        <td>{item.address.address}</td>
                                        <td>{item.ward.type === 'phuong' ? item.ward.name_with_type : item.ward.name}</td>
                                        <td>{item.district.name}</td>
                                        <td>{item.province.name}</td>
                                        <td><Link to={`/User/Motel/${item._id}/1`} className="btn btn-primary text-white ">Xem</Link></td>
                                        <td><Button variant="danger" onClick={() => { handleButton('delete-motel', item, index) }}>Xóa</Button></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                    <tfoot >
                        <tr >
                            <td colSpan="11">
                                <Pagenated
                                    quantityPage={quantityPage}
                                    className="d-flex justify-content-center"
                                ></Pagenated>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
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


export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(MotelContent));

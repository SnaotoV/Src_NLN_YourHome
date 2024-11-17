import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getQuantityPage, getDataInPage } from "../../services/appServices";
import { withRouter, Link } from 'react-router-dom';
import { Button, Table } from "react-bootstrap";
import AddMotelForm from '../AddMotelForm/AddMotelForm';
import { toast } from 'react-toastify';
import Pagenated from '../Pagenated/Pagenated';
import { deleteMotel } from '../../services/userServices';
let AdminMotel = (props) => {
    let [listMotel, setListMotel] = useState([]);
    let [page, setPage] = useState(1);
    let [quantityPage, setQuantityPage] = useState(1);
    let [handleEditMotelModel, setHandleEditMotelModel] = useState(false)
    let [handleAddMotelModal, setHandleAddMotelModel] = useState(false)
    let [user, setUser] = useState({ ...props.userInfor });
    let handleButton = async (type, motel) => {
        if (type === 'edit') {
            setHandleEditMotelModel(!handleEditMotelModel);
        }
        if (type === 'add-motel') {
            setHandleAddMotelModel(!handleAddMotelModal);
            if (handleAddMotelModal) {
                await reFetchData()
            }
        }
        if (type === 'delete-motel') {
            let data = await deleteMotel('admin', motel);
            if (data && data.errCode === 0) {
                toast.success(data.value, { position: toast.POSITION.TOP_RIGHT });
                await reFetchData()
            } else {
                toast.error(data.value, { position: toast.POSITION.TOP_RIGHT });
            }
        }
    }
    let reFetchData = async () => {
        let clonePage = page;
        let cloneListMotel = await getDataInPage('motel', clonePage, 10);
        let quantityPageFromBE = await getQuantityPage('motel', 10);
        setListMotel(cloneListMotel.data);
        setQuantityPage(quantityPageFromBE);
    }
    useEffect(() => {
        let getData = async () => {
            let clonePage = page;
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('motel', clonePage, 10);
                let quantityPageFromBE = await getQuantityPage('motel', 10);
                setListMotel(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData()
    }, []);
    useEffect(() => {
        let getData = async () => {
            let clonePage = page
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('motel', clonePage, 10);
                let quantityPageFromBE = await getQuantityPage('motel', 10);
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
            <div className='m-2'>
                <Button onClick={() => handleButton('add-motel')}>Thêm dãy trọ</Button>
            </div>
            <div className="main-title fs-2 m-2 text-center rounded">Dãy trọ</div>
            <Table>
                <thead>
                    <tr className="text-center">
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
                                    <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</td>
                                    <td>{item.address.address}</td>
                                    <td>{item.ward.type === 'phuong' ? item.ward.name_with_type : item.ward.name}</td>
                                    <td>{item.district.name}</td>
                                    <td>{item.province.name}</td>
                                    <td><Button>Sửa</Button></td>
                                    <td><Button variant="danger" onClick={() => { handleButton('delete-motel', item) }}>Xóa</Button></td>
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
            <AddMotelForm
                modalName={"Thêm dãy nhà trọ"}
                show={handleAddMotelModal}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Lưu'}
                modalClose={'Hủy'} />
        </div>
    )
}
const mapStatetoProps = state => {
    return {
        userInfor: state.user.userInfor,
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AdminMotel));
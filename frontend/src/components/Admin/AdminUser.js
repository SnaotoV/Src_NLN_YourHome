import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getQuantityPage, getDataInPage } from "../../services/appServices";
import { withRouter, Link } from 'react-router-dom';
import { Button, Table } from "react-bootstrap";
import Pagenated from '../Pagenated/Pagenated';
import RegistorForm from '../RegistorForm/RegistorForm';
import { getGender } from '../../ultils/gender';
let AdminUser = (props) => {
    let [page, setPage] = useState(1);
    let [quantityPage, setQuantityPage] = useState(1);
    let [user, setUser] = useState({});
    let [listUser, setListUser] = useState([]);
    let [handleModalAdd, setHandleModalAdd] = useState(false);
    let handleButton = async (type, data) => {
        if (type === 'register') {
            setHandleModalAdd(!handleModalAdd);
            if (handleModalAdd) {
                await reFetchData();
            }
        }
    }
    let reFetchData = async () => {
        let clonePage = page;
        let cloneListMotel = await getDataInPage('user', clonePage, 10);
        let quantityPageFromBE = await getQuantityPage('user', 10);
        setListUser(cloneListMotel.data);
        setQuantityPage(quantityPageFromBE);
    }
    useEffect(() => {
        let getData = async () => {
            let clonePage = page;
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('user', clonePage, 10);
                let quantityPageFromBE = await getQuantityPage('user', 10);
                setListUser(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData()
    }, []);
    useEffect(() => {
        let getData = async () => {
            let clonePage = page
            if (user && user._id) {
                let cloneListMotel = await getDataInPage('user', clonePage, 10);
                let quantityPageFromBE = await getQuantityPage('user', 10);
                setListUser(cloneListMotel.data);
                setQuantityPage(quantityPageFromBE);
            }
        }
        getData()
    }, [user, page]);
    useEffect(() => {
        let clonePage = props.match.params.page;
        setUser(props.userInfor);
        setPage(clonePage);
    }, [props.match.params.page, props.userInfor]);
    console.log(listUser);
    return (
        <div>
            <Button className='m-2' onClick={() => handleButton('register')}>Thêm người dùng</Button>
            <div className="main-title fs-2 m-2 text-center rounded">Người dùng</div>
            <div>
                <Table>
                    <thead>
                        <tr className='text-center'>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>CCCD</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Quê quán</th>
                            <th>Tài khoản</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUser && listUser.length > 0 && listUser.map((item, index) => {
                                return (
                                    <tr className="text-center" key={index}>
                                        <td >{index + 1}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.CICNumber}</td>
                                        <td>{item.birthday} </td>
                                        <td>{getGender(item.gender)}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            <Button className='mx-2'>Sửa</Button>
                                            <Button className='mx-2' variant="danger">Xóa</Button>
                                        </td>
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
            <RegistorForm
                modalName={"Thêm người dùng"}
                show={handleModalAdd}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Lưu'}
                modalClose={'Hủy'}
            />
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
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AdminUser));
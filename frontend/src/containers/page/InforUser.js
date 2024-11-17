import { useEffect, useState } from "react";
import { connect } from "react-redux";
import image from '../../assets/image/user_clone.jpg'
import '../../styles/InforUser/InforUser.scss'
import { NavLink } from 'react-router-dom';
import EditInforForm from "../../components/EditInforForm/EditInforForm";
import { withRouter, Switch, Route } from "react-router-dom";
import MotelContent from "../../components/ContentInforUser/MotelContent";
import NewsContent from "../../components/ContentInforUser/NewsContent";
import AddMotelForm from "../../components/AddMotelForm/AddMotelForm";
import * as actions from '../../stores/actions'
import InforContent from "../../components/ContentInforUser/InforContent";
import BillContent from "../../components/ContentInforUser/BillContent";
let InforUser = (props) => {
    let [user, setUser] = useState({});
    let [handleEditInforModal, setHandleEditInforUser] = useState(false)
    let [handleAddMotelModal, setHandleAddMotelModel] = useState(false)
    let [checkGetData, setCheckGetData] = useState(true);
    let checkFetchData = () => {
        setCheckGetData(!checkGetData);
    }
    let handleButton = (type) => {
        if (localStorage.getItem("accessToken")) {
            if (type === 'edit') {
                setHandleEditInforUser(!handleEditInforModal);
            }
            if (type === 'add-motel') {
                setHandleAddMotelModel(!handleAddMotelModal);
                checkFetchData();
            }
            if (type === 'logout') {
                let history = props.history;
                history.replace({ pathname: '/' });
                localStorage.removeItem('accessToken');
                document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                props.processLogout();

            }
        }
        else {
            console.log("cần đăng nhập để thực hiện thao tác");
        }
    }
    useEffect(() => {
        setUser(props.userInfor)
    }, [props.userInfor])
    return (
        <div className="main-content">
            <div className="row main-title ">
                <div className="col-2 ">
                    <img src={image} className="border rounded-circle my-4" height={"200px"} width={"200px"}></img>
                </div>
                <div className="h2 my-4 mx-2 col row align-items-center">{user && user.fullName}</div>
            </div>
            <div className="row p-4">
                <div className="col-2 p-4 row submenu">
                    <button className=" btn-infor text-center col-12 fs-5 my-1" onClick={() => handleButton('edit')}>Chỉnh sửa<i class="fas fa-user-edit mx-2 "></i></button>
                    <button className=" btn-infor text-center col-12 fs-5 my-1" onClick={() => handleButton('add-motel')}>Thêm dãy trọ<i class="fas fa-plus mx-2 "></i></button>
                    {/* <button className=" btn-infor text-center col-12 fs-5 my-1">Thêm bài viết<i class="fas fa-pencil-alt mx-2"></i></button> */}
                    <button className=" btn-infor text-center col-12 fs-5 my-1" onClick={() => handleButton('logout')} >Đăng xuất<i class="fas fa-sign-out-alt mx-2"></i></button>
                </div>
                <div className="col-10 p-4 border rounded-4 shadow bg-white">
                    <div className="row">
                        <NavLink to='/Infor/User/1' activeClassName='active-infor' className="col-3 btn-infor text-center mx-1 fs-5">Người dùng</NavLink>
                        <NavLink to='/Infor/Motel/1' activeClassName='active-infor' className="col-3 btn-infor text-center mx-1 fs-5">Dãy trọ</NavLink>
                        <NavLink to='/Infor/Bill/1' activeClassName='active-infor' className="col-3 btn-infor text-center mx-1 fs-5">Hoá đơn</NavLink>
                        {/* <NavLink to='/Infor/News/1' activeClassName='active-infor' className="col-3 btn-infor text-center mx-1">Bài viết</NavLink> */}
                    </div>
                    <div className="m-4 ">
                        <Switch>
                            <Route path={'/Infor/Motel/:page'}><MotelContent checkGetData={checkGetData} /></Route>
                            <Route path={'/Infor/News/:page'}><NewsContent /></Route>
                            <Route path={'/Infor/User/:page'}><InforContent /></Route>
                            <Route path={'/Infor/Bill/:page'}><BillContent /></Route>

                        </Switch>
                    </div>
                </div>
            </div>
            <EditInforForm
                userInfor={user}
                modalName={"Cập nhật thông tin người dùng"}
                show={handleEditInforModal}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Lưu'}
                modalClose={'Hủy'} />
            <AddMotelForm
                modalName={"Thêm dãy nhà trọ"}
                show={handleAddMotelModal}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Lưu'}
                modalClose={'Hủy'} />
        </div >
    )
}
const mapStateToProps = state => {
    return {
        userInfor: state.user.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InforUser));
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import image from '../../assets/image/60380.jpg'
import '../../styles/InforUser/InforUser.scss'
import { NavLink } from 'react-router-dom';
import EditInforForm from "../../components/EditInforForm/EditInforForm";
import { withRouter, Switch, Route } from "react-router-dom";
import MotelContent from "../../components/ContentInforUser/MotelContent";
import NewsContent from "../../components/ContentInforUser/NewsContent";
import AddMotelForm from "../../components/AddMotelForm/AddMotelForm";
import { getGender } from "../../ultils/gender";
import InforContent from "../../components/ContentInforUser/InforContent";
let InforUser = (props) => {
    let [user, setUser] = useState({});
    let [handleEditInforModal, setHandleEditInforUser] = useState(false)
    let [handleAddMotelModal, setHandleAddMotelModel] = useState(false)
    let [checkGetData, setCheckGetData] = useState(true);
    let checkFetchData = () => {
        setCheckGetData(!checkGetData);
    }
    let handleButton = (type) => {
        if (type === 'edit') {
            setHandleEditInforUser(!handleEditInforModal);
        }
        if (type === 'add-motel') {
            setHandleAddMotelModel(!handleAddMotelModal);
            checkFetchData();
        }
    }
    useEffect(() => {
        setUser(props.userInfor)
    }, [props.userInfor])
    return (
        <div className="main-content my-2">
            <div className="row my-2 main-title ">
                <div className="col-2 ">
                    <img src={image} className="border rounded-circle my-2"></img>
                </div>
                <div className="h2 my-4 mx-2 col row align-items-center">{user && user.fullName}</div>
            </div>
            <div className="row p-4">
                <div className="col-2 p-4 row submenu">
                    <button className=" btn-infor text-center col-12 fs-5 my-1" onClick={() => handleButton('edit')}>Chỉnh sửa<i class="fas fa-user-edit mx-2 "></i></button>
                    <button className=" btn-infor text-center col-12 fs-5 my-1" onClick={() => handleButton('add-motel')}>Thêm dãy trọ<i class="fas fa-plus mx-2 "></i></button>
                    <button className=" btn-infor text-center col-12 fs-5 my-1">Thêm bài viết<i class="fas fa-pencil-alt mx-2"></i></button>
                </div>
                <div className="col-10 p-4 border rounded-4 shadow bg-white">
                    <div className="row">
                        <NavLink to='/Infor/User/1' activeClassName='active-infor' className="col-3 btn-infor text-center mx-1">Người dùng</NavLink>
                        <NavLink to='/Infor/Motel/1' activeClassName='active-infor' className="col-3 btn-infor text-center mx-1">Dãy trọ</NavLink>
                        <NavLink to='/Infor/News/1' activeClassName='active-infor' className="col-3 btn-infor text-center mx-1">Bài viết</NavLink>
                    </div>
                    <div className="m-4 ">
                        <Switch>
                            <Route path={'/Infor/Motel/:page'}><MotelContent checkGetData={checkGetData} /></Route>
                            <Route path={'/Infor/News/:page'}><NewsContent /></Route>
                            <Route path={'/Infor/User/:page'}><InforContent /></Route>
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
        </div>
    )
}
const mapStateToProps = state => {
    return {
        userInfor: state.user.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InforUser));
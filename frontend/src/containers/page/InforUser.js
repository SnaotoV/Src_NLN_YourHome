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
let InforUser = (props) => {
    let [user, setUser] = useState({});
    let [handleEditInforModal, setHandleEditInforUser] = useState(false)
    let [handleAddMotelModal, setHandleAddMotelModel] = useState(false)

    let handleButton = (type) => {
        if (type === 'edit') {
            setHandleEditInforUser(!handleEditInforModal);
        }
        if (type === 'add-motel') {
            setHandleAddMotelModel(!handleAddMotelModal);
        }
    }
    useEffect(() => {
        setUser(props.userInfor)
    }, [props.userInfor])
    return (
        <div className="main-content my-2">
            <div className="row my-2 main-title">
                <div className="col-2 ">
                    <img src={image} className="border rounded-circle my-2"></img>
                </div>
                <div className="h2 my-4 mx-2 col row align-items-center">{user && user.fullName}</div>
            </div>
            <div className="row p-4">
                <div className="col-3 row">
                    <table className="fs-5 border infor-box col-12">
                        <thead>
                            <tr>
                                <td colSpan={2} className="text-center py-2 fs-3 main-title">Thông tin</td>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td className="px-4">Số căn cước:</td>
                                <td className="px-4">{user && user.CICNumber}</td>
                            </tr>
                            <tr>
                                <td className="px-4">Giới tính  :</td>
                                <td className="px-4">{user && getGender(user.gender)}</td>
                            </tr>
                            <tr>
                                <td className="px-4">Ngày sinh:</td>
                                <td className="px-4">{user && user.birthday}</td>
                            </tr>
                            <tr>
                                <td className="px-4">Quê quán:</td>
                                <td className="px-4">{user && user.address}</td>
                            </tr>
                            <tr>
                                <td className="px-4">Số điện thoại:</td>
                                <td className="px-4">{user && user.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className=" btn-infor text-center col-12 fs-5 my-1" onClick={() => handleButton('edit')}>Chỉnh sửa<i class="fas fa-user-edit mx-2 "></i></button>
                    <button className=" btn-infor text-center col-12 fs-5 my-1" onClick={() => handleButton('add-motel')}>Thêm dãy trọ<i class="fas fa-plus mx-2 "></i></button>
                    <button className=" btn-infor text-center col-12 fs-5 my-1">Thêm bài viết<i class="fas fa-pencil-alt mx-2"></i></button>
                </div>
                <div className="col-9 p-4 border">
                    <div className="row">
                        <NavLink to='/Infor/Motel/1' activeClassName='active-infor' className="col-5 btn-infor text-center mx-4">Dãy trọ</NavLink>
                        <NavLink to='/Infor/News/1' activeClassName='active-infor' className="col-5 btn-infor text-center mx-4">Bài viết</NavLink>
                    </div>
                    <div className="m-4">
                        <Switch>
                            <Route path={'/Infor/Motel/:page'}><MotelContent /></Route>
                            <Route path={'/Infor/News/:page'}><NewsContent /></Route>
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
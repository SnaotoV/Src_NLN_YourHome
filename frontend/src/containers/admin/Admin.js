import { withRouter, Switch, Route, Link } from "react-router-dom";
import AdminMotel from "../../components/Admin/AdminMotel";
import { connect } from "react-redux";
import AdminUser from "../../components/Admin/AdminUser";
import * as actions from '../../stores/actions';
import AdminImage from "../../components/Admin/AdminImage";
import AdminStatistical from "../../components/Admin/AdminStatistical";
import InforMotel from "../page/InforMotel";
import InforHirePage from "../page/InforHirePage";
import AllDataRoom from "../page/AllDataRoom";
import { useEffect } from "react";
let Admin = (props) => {
    let handleButton = () => {
        let history = props.history;
        history.replace({ pathname: '/' });
        props.processLogout();
    }
    // useEffect(() => {
    //     let history = props.history;
    //     history.replace({ pathname: '/Admin/User/1' });
    // }, [])
    return (
        <div className="bg-white m-4 rounded-4 shadow">
            <div className="row p-2">
                <div className="col-2 p-4">
                    <div className="row">
                        <Link to='/Admin/Statistical' className="m-2 btn-infor text-center fs-5">Thống kê</Link>
                        <Link to='/Admin/User/1' className="m-2 btn-infor text-center fs-5">Người dùng</Link>
                        <Link to='/Admin/Motel/1' className="m-2 btn-infor text-center fs-5">Dãy trọ</Link>
                        {/* <Link to='/Admin/Image' className="m-2 btn-infor text-center fs-5">Hình ảnh</Link> */}
                        <button className=" btn-infor text-center col-12 fs-5 m-2" onClick={() => handleButton()}>Đăng xuất<i class="fas fa-sign-out-alt mx-2"></i></button>

                    </div>
                </div>
                <div className="col-10 p-4">
                    <Switch>
                        <Route path={'/'} exact><AdminStatistical /></Route>
                        <Route path={'/Admin'} exact><AdminStatistical /></Route>
                        <Route path={'/Admin/Statistical'}><AdminStatistical /></Route>
                        <Route path={'/Admin/User/:page'}><AdminUser /></Route>
                        <Route path={'/Admin/Motel/:page'}><AdminMotel /></Route>
                        <Route path={'/Admin/Image'}><AdminImage /></Route>
                        <Route path={'/Admin/InforMotel/:id/:page'}><InforMotel /></Route>
                        <Route path={'/User/Hire/Motel/:id'}><InforHirePage /></Route>
                        <Route path={'/User/AllData/Room/:id/:page'}><AllDataRoom /></Route>
                    </Switch>
                </div>
            </div>
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
        processLogout: () => dispatch(actions.processLogout())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
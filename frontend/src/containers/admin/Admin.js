import { withRouter, Switch, Route, Link } from "react-router-dom";
import AdminMotel from "../../components/Admin/AdminMotel";
import { connect } from "react-redux";
import AdminUser from "../../components/Admin/AdminUser";
import * as actions from '../../stores/actions'
import AdminImage from "../../components/Admin/AdminImage";
let Admin = (props) => {
    let handleButton = () => {
        let history = props.history;
        history.replace({ pathname: '/' });
        props.processLogout();
    }
    return (
        <div className="bg-white m-4 rounded-4 shadow">
            <div className="row p-2">
                <div className="col-2 p-4">
                    <div className="row">
                        <Link to='/Admin/User/1' className="m-2 btn-infor text-center fs-5">Người dùng</Link>
                        <Link to='/Admin/Motel/1' className="m-2 btn-infor text-center fs-5">Dãy trọ</Link>
                        {/* <Link to='/Admin/Image' className="m-2 btn-infor text-center fs-5">Hình ảnh</Link> */}
                        <button className=" btn-infor text-center col-12 fs-5 m-2" onClick={() => handleButton()}>Đăng xuất<i class="fas fa-sign-out-alt mx-2"></i></button>

                    </div>
                </div>
                <div className="col-10 p-4">
                    <Switch>
                        <Route path={'/Admin/User/:page'}><AdminUser /></Route>
                        <Route path={'/Admin/Motel/:page'}><AdminMotel /></Route>
                        <Route path={'/Admin/Image'}><AdminImage /></Route>
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
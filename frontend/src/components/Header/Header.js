import { NavLink } from 'react-router-dom';
import '../../styles/Component/Header.scss';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegistorForm from '../RegistorForm/RegistorForm';
let Header = (props) => {
    let [handleLoginModal, setHandleLoginModal] = useState(false);
    let [handleRegisterModal, setHandleRegisterModal] = useState(false);
    let handleButton = (type) => {
        if (type === 'login') {
            setHandleLoginModal(!handleLoginModal)
        }
        if (type === 'register') {
            setHandleRegisterModal(!handleRegisterModal)
        }
    }
    return (
        <div className='row bg-white'>
            <div className='col-3 p-2 fs-1 px-4'>MyHome</div>
            <div className='nav header-nav col-7'>
                <NavLink className='py-4 px-4 fs-4' activeClassName="active" to='/' exact={true}>Trang chủ</NavLink>
                {props.userInfor?.isAdmin ?
                    <></>
                    :
                    <NavLink className='py-4 px-4 fs-4' activeClassName="active" to='/Motel/1' exact={true}>Dãy trọ</NavLink>
                }
                {/* <NavLink className='py-2 px-4 fs-5' activeClassName="active" to='/News' exact={true}>Tin tức</NavLink>
                <NavLink className='py-2 px-4 fs-5' activeClassName="active" to='/Contact' exact={true}>Liên hệ</NavLink> */}
                {props.isLoggedIn && localStorage.getItem("accessToken") ?
                    props.userInfor.isAdmin === false &&
                    <NavLink className='py-4 px-4 fs-4 ' activeClassName="active" to='/Infor/User/1'>Cá nhân</NavLink>
                    :
                    <>
                        <button className='py-4 px-4 fs-4 ' onClick={() => handleButton('login')}>Đăng Nhập</button>
                        <button className='py-4 px-4 fs-4 ' onClick={() => handleButton('register')} > Đăng Ký</button>
                    </>
                }
            </div>
            <LoginForm
                modalName={"Đăng Nhập"}
                show={handleLoginModal}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Đăng Nhập'}
                modalClose={'Hủy'}
            ></LoginForm>
            <RegistorForm
                modalName={"Đăng Ký"}
                show={handleRegisterModal}
                handleClickChanges={handleButton}
                handleClickClose={handleButton}
                modalChanges={'Đăng Ký'}
                modalClose={'Hủy'}
            />
            <div className='py-4 px-4 col-2'>liên hệ: 035-xxx-xxxx </div>
        </div >
    )
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
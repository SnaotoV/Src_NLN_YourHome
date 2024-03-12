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
        <div className='row'>
            <div className='col-3 p-2'>logo</div>
            <div className='nav header-nav col-9'>
                <NavLink className='py-2 px-4 fs-5' activeClassName="active" to='/' exact={true}>Trang chủ</NavLink>
                <NavLink className='py-2 px-4 fs-5' activeClassName="active" to='/Motel' exact={true}>Dãy trọ</NavLink>
                <NavLink className='py-2 px-4 fs-5' activeClassName="active" to='/News' exact={true}>Tin tức</NavLink>
                <NavLink className='py-2 px-4 fs-5' activeClassName="active" to='/Contact' exact={true}>Liên hệ</NavLink>
                {props.isLoggedIn ?
                    <NavLink className='py-2 px-4 fs-5' activeClassName="active" to='/Infor'>Cá nhân</NavLink>
                    :
                    <>
                        <button className='py-2 px-4 fs-5' onClick={() => handleButton('login')}>Đăng Nhập</button>
                        <button className='py-2 px-4 fs-5' onClick={() => handleButton('register')} > Đăng Ký</button>
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
        </div >
    )
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
import '../styles/App.scss';
import { connect } from 'react-redux';
import Home from './page/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import InforUser from './page/InforUser';
import Pay from './page/Pay';
import DetailMotel from './page/DetailMotel';
import Motel from './page/Motels';
import News from './page/News';
import InforMotel from './page/InforMotel';
import InforHirePage from './page/InforHirePage';
import Contact from './page/Contact';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
function App(props) {
  return (
    <BrowserRouter>
      <div className="container-fluid  main-bg ">
        <Header></Header>
        <div className=' content-box'>
          <Switch>
            <Route path={'/'} exact component={(Home)} />
            <Route path={'/Infor'} component={(InforUser)} />
            <Route path={'/Motel/:page'} component={(Motel)} />
            <Route path={'/Detail/Motel/:id'} component={(DetailMotel)} />
            <Route path={'/News'} exact component={(News)} />
            <Route path={'/Contact'} exact component={(Contact)} />
            <Route path={'/User/Motel/:id/:page'} component={(InforMotel)} />
            <Route path={'/Pay/:id'} component={(Pay)} />
            <Route path={'/User/Hire/Motel/:id'} component={(InforHirePage)} />
          </Switch>
        </div>
        <Footer></Footer>
      </div>
      <ToastContainer></ToastContainer>
    </BrowserRouter>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

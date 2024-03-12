import '../styles/App.scss';
import { connect } from 'react-redux';
import Home from './page/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import InforUser from './page/InforUser';
import InforRoom from './page/InforRoom';
import Motel from './page/Motels';
import News from './page/News';
import Contact from './page/Contact';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
function App(props) {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Header></Header>
        <Switch>
          <Route path={'/'} exact component={(Home)} />
          <Route path={'/Infor'} exact component={(InforUser)} />
          <Route path={'/InforRoom'} exact component={(InforRoom)} />
          <Route path={'/Motel'} exact component={(Motel)} />
          <Route path={'/News'} exact component={(News)} />
          <Route path={'/Contact'} exact component={(Contact)} />
        </Switch>
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

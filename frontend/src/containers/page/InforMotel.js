import Pagination from 'react-bootstrap/Pagination';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getMotel } from '../../services/userServices';

let InforMotel = (props) => {

    let [dataMotel, setDataMotel] = useState({});
    useEffect(() => {
        let idMotel = props.match.params.id;
        let idUser = props.userInfor ? props.userInfor._id : null
        if (idUser) {
            let getData = async () => {
                let data = await getMotel(idMotel, idUser)
                setDataMotel(data);
            }
            getData();
        }
    }, [])
    useEffect(() => {
        let idMotel = props.match.params.id;
        let idUser = props.userInfor ? props.userInfor._id : null
        if (idUser) {
            let getData = async () => {
                let data = await getMotel(idMotel, idUser)
                setDataMotel(data);
            }
            getData();
        }
    }, [props.userInfor])

    return (
        <div className='infor-motel-box'>
            <div>
                {console.log(dataMotel)}
                hello
            </div>
        </div>
    )

}

const mapStatetoProps = state => {
    return {
        userInfor: state.user.userInfor
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(InforMotel));
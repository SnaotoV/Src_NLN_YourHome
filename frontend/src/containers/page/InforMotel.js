import Pagination from 'react-bootstrap/Pagination';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { getMotel } from '../../services/userServices';

let InforMotel = (props) => {
    let [motel, setMotel] = useState({});

    useEffect(() => {
        let getData = async () => {
            let data = await getMotel(props.match.params.id);
            console.log(data);
            setMotel(data);
        }
        getData()
    }, [props.match.params.id])


    return (
        <div className='infor-motel-box'>
            <div>
                hello
            </div>
        </div>
    )

}


export default InforMotel;
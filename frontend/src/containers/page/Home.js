import '../../styles/Container/Home.scss';
import image from '../../assets/image/60380.jpg';
import { Form, Button, Card, Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDataInPage } from '../../services/appServices';
let Home = (props) => {
    let [motels, setMotels] = useState({});
    let [user, setUser] = useState({});

    useEffect(() => {
        let getData = async () => {
            let data = await getDataInPage('motel-home', 1)
            if (data) {
                setMotels(data.data)
            }
        }
        getData()
    }, [])
    useEffect(() => {
        setUser(props.userInfor)
    }, [props.userInfor])
    console.log(motels);
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1000} >
                    <div className="">
                        <img className="w-100 slide-image" src={image} alt="Hình ảnh đại diện sản phẩm"></img>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000} >
                    <div className="">
                        <img className="w-100 slide-image" src={image} alt="Hình ảnh đại diện sản phẩm"></img>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000} >
                    <div className="">
                        <img className="w-100 slide-image" src={image} alt="Hình ảnh đại diện sản phẩm"></img>
                    </div>
                </Carousel.Item>
            </Carousel>
            <div className='search-box row justify-content-center align-items-center '>
                <Form className="col-6 ">
                    <Form.Control placeholder="Nhập nội dung tìm kiêm"></Form.Control>
                </Form>
                <Button className='col-2'>Tìm kiếm</Button>
            </div>
            <div className='h2 text-center m-4'>Phòng trống nổi bật</div>
            <div className='cart-box mx-3 row'>
                {motels && motels.length > 0 && motels.map((item, index) => {

                    return (
                        <div className="col-3" key={index}>
                            <Card>
                                <Card.Img className="w-100 card-img" variant="top" src={item.image.length > 0 && item?.image[0].image} />
                                <Card.Body>
                                    <Card.Title className=" title-text">{item.name}</Card.Title>
                                    <Card.Text>
                                        Chiều dài: {item.horizontal}m
                                        <br />
                                        Chiều rộng: {item.vertical}m
                                        <br />
                                        {item.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND/tháng
                                    </Card.Text>
                                    <Link className='btn btn-dark text-white' to={(user && user._id === item.userId) ? `/User/Motel/${item._id}/1` : `/Detail/Motel/${item._id}`}>Xem chi tiết</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
                )}
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
export default connect(mapStatetoProps, mapDispatchToProps)(Home);
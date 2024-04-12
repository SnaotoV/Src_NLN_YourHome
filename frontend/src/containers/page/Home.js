import '../../styles/Container/Home.scss';
import image from '../../assets/image/60380.jpg';
import { Form, Button, Card, Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';

let Home = () => {
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
                <Card className='col-3'>
                    <Card.Img src={image} className="w-100 card-img" variant="top" />
                    <Card.Body>
                        <Card.Title className=" title-text">Sản phẩm test</Card.Title>
                        <div className='row'>
                            <Card.Text>
                                Địa chỉ: Ninh Kiều, Cần Thơ
                                <br /><p className='text-primary fs-4'>17000000 VND/tháng</p>
                            </Card.Text>
                            <Link className='btn btn-primary text-white' to='/'>Xem chi tiết</Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card className='col-3'>
                    <Card.Img src={image} className="w-100 card-img" variant="top" />
                    <Card.Body>
                        <Card.Title className=" title-text">Sản phẩm test</Card.Title>
                        <div className='row'>
                            <Card.Text>
                                Địa chỉ: Ninh Kiều, Cần Thơ
                                <br /><p className='text-primary fs-4'>17000000 VND/tháng</p>
                            </Card.Text>
                            <Link className='btn btn-primary text-white' to='/'>Xem chi tiết</Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card className='col-3'>
                    <Card.Img src={image} className="w-100 card-img" variant="top" />
                    <Card.Body>
                        <Card.Title className=" title-text">Sản phẩm test</Card.Title>
                        <div className='row'>
                            <Card.Text>
                                Địa chỉ: Ninh Kiều, Cần Thơ
                                <br /><p className='text-primary fs-4'>17000000 VND/tháng</p>
                            </Card.Text>
                            <Link className='btn btn-primary text-white' to='/'>Xem chi tiết</Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card className='col-3'>
                    <Card.Img src={image} className="w-100 card-img" variant="top" />
                    <Card.Body>
                        <Card.Title className=" title-text">Sản phẩm test</Card.Title>
                        <div className='row'>
                            <Card.Text>
                                Địa chỉ: Ninh Kiều, Cần Thơ
                                <br /><p className='text-primary fs-4'>17000000 VND/tháng</p>
                            </Card.Text>
                            <Link className='btn btn-primary text-white' to='/'>Xem chi tiết</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Home;
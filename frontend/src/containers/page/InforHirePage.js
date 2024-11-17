import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { getFullDate, validDate, getListYear } from "../../ultils/getFullDate";
import { getMotel, getBillAllMotel } from '../../services/userServices';
import ModalAddBill from "../../components/ModalAddBill/ModalAddBill";
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
let InforHirePage = (props) => {
    let [motel, setMotel] = useState({});
    let [activeRoom, setActiveRoom] = useState({})
    let [handleModalAddBill, setHandleModalAddBill] = useState(false);
    let [index, setIndex] = useState({});
    let [year, setYear] = useState(new Date().getFullYear());
    let [listYear, setListYear] = useState([])

    let [dataAllMotel, setDataAllMotel] = useState({
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    })
    let [dataRoom, setDataRoom] = useState({
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    })
    // let handleModal = () => {
    //     setHandleModalAddBill(!handleModalAddBill)
    // }
    let handleButton = (item, index) => {
        setActiveRoom(item);
        setIndex(index)
        setHandleModalAddBill(!handleModalAddBill)
    }
    let handleButtonPay = () => {

    }
    let setRoom = async (data) => {
        let cloneMotel = { ...motel };
        cloneMotel.listRoom[index].inforHire[0] = data;
        setMotel(cloneMotel);
    }
    let SumBill = () => {
        let sum = {
            all: 0,
            pay: 0,
            indeb: 0
        };
        motel.listRoom.forEach(e => {
            if (e.inforHire[0]?.bills && e.inforHire[0].bills.length > 0) {
                sum.all += Number((Number(e.inforHire[0].bills[0].price) + (e.inforHire[0].bills[0].valueE * motel.priceEW[0].priceE) + (e.inforHire[0].bills[0].valueW * motel.priceEW[0].priceW)));
                if (e.inforHire[0].bills[0].statusCode === 6) {
                    sum.pay += Number((Number(e.inforHire[0].bills[0].price) + (e.inforHire[0].bills[0].valueE * motel.priceEW[0].priceE) + (e.inforHire[0].bills[0].valueW * motel.priceEW[0].priceW)));
                }
                else {
                    sum.indeb += Number((Number(e.inforHire[0].bills[0].price) + (e.inforHire[0].bills[0].valueE * motel.priceEW[0].priceE) + (e.inforHire[0].bills[0].valueW * motel.priceEW[0].priceW)));
                }
            }

        });
        // console.log(motel);
        return sum
    }
    // useEffect(() => {
    //     setHandleModalAddBill(!handleModalAddBill)
    // }, [activeRoom])

    useEffect(() => {
        let getData = async () => {
            if (props.match.params.id) {
                let data = await getMotel(props.match.params.id, 'admin');
                if (data) {
                    setMotel(data.data);
                    setListYear(getListYear(new Date(data.data.create_at).getFullYear()));

                    let dataBillAllMotel = await getBillAllMotel(year);

                    // Tạo đối tượng mới cho dataAllMotel
                    setDataAllMotel({
                        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                        datasets: [
                            {
                                label: 'Doanh thu',
                                data: dataBillAllMotel.value,
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                }
            }
        };
        getData();
    }, [props.match.params.id, year]);

    const optionsAllMotel = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Doanh thu toàn phòng trọ theo tháng trong năm ${year}`,
            },
        },
    };
    const optionsRoom = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Doanh thu phòng theo tháng trong năm ${year}`,
            },
        },
    };

    return (
        <div className="bg-white m-4 rounded-4 shadow p-4">
            {motel && motel._id &&
                <>
                    <div className="row">
                        <Form className="col-2">
                            <Form.Select id="disabledSelect" >
                                {listYear.length > 0 && listYear.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8 ">
                            {console.log(dataAllMotel)}
                            <Bar data={dataAllMotel} options={optionsAllMotel} />;
                        </div>
                        {/* <div className="col-6">
                            <Bar data={dataRoom} options={optionsRoom} />;
                        </div> */}
                    </div>
                    <div className="row my-2">
                        <p className="fs-3 text_center">
                            Danh sách thuê phòng.
                        </p>
                        {motel.listRoom && motel.listRoom.filter((item) => {
                            return item.statusCode === 2;
                        }).length > 0 ?
                            < Table >
                                <thead>
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>Tên người dùng</th>
                                        <th>Số điện thoại</th>
                                        <th>Thời gian bắt đầu thuê</th>
                                        <th>Ngày thanh toán</th>
                                        {/* <th>Tổng tiền</th>
                                        <th>Phiếu thu</th> */}
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {motel.listRoom.map((item, index) => {
                                        return (
                                            item.statusCode === 2 ?
                                                <tr className="text-center" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.inforHire[0].user[0].fullName}</td>
                                                    <td>{item.inforHire[0].user[0].phoneNumber}</td>
                                                    <td>{getFullDate(item.inforHire[0].create_at)}</td>
                                                    <td>
                                                        {item.inforHire[0].bills.length > 0 &&
                                                            item.inforHire[0].bills[0].statusCode === 7 ?
                                                            <Button variant="success">Đã thanh toán trực tiếp</Button>
                                                            :
                                                            <Button onClick={() => handleButton(item.inforHire[0], index)}>Tạo phiếu thu</Button>
                                                        }
                                                    </td>
                                                    <td>
                                                        <Button variant="primary"><i class="far fa-eye"></i></Button>
                                                    </td>
                                                </tr>
                                                :
                                                <tr className="text-center" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>Phòng trống</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>

                                                    </td>
                                                    <td>
                                                        <Button variant="primary"><i class="far fa-eye"></i></Button>
                                                    </td>
                                                </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            :
                            <div className="fs-4 text-center">
                                <i>
                                    Hiện chưa có người thuê phòng
                                </i>
                            </div>
                        }
                    </div>
                    <ModalAddBill
                        setRoom={setRoom}
                        room={activeRoom}
                        motel={motel}
                        modalName={"Lập phiếu thu"}
                        show={handleModalAddBill}
                        handleClickChanges={handleButton}
                        handleClickClose={handleButton}
                        modalChanges={'Lưu'}
                        modalClose={'Hủy'} />
                </>
            }
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
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InforHirePage));
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { getFullDate, validDate, getListYear } from "../../ultils/getFullDate";
import { getMotel, getBillAllMotel } from '../../services/userServices';
import ModalAddBill from "../../components/ModalAddBill/ModalAddBill";
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import RemoveHire from "../../components/HireRoom/RemoveHire";

let InforHirePage = (props) => {
    let [motel, setMotel] = useState({});
    let [activeRoom, setActiveRoom] = useState({})
    let [handleModalAddBill, setHandleModalAddBill] = useState(false);
    let [handleRemoveHire, setHandleRemoveHire] = useState(false);
    let [index, setIndex] = useState({});
    let [year, setYear] = useState(new Date().getFullYear());
    let [listYear, setListYear] = useState([])
    let [activeHire, setActiveHire] = useState({})
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
    let handleButtonModal = (data) => {
        setHandleRemoveHire(!handleRemoveHire);
        setActiveHire(data);
    }
    let setRoom = async (data) => {
        let cloneMotel = { ...motel };
        cloneMotel.listRoom[index].inforHire[0] = data;
        setMotel(cloneMotel);
        getData();
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
    let getData = async () => {
        if (props.match.params.id) {
            let data = await getMotel(props.match.params.id, 'admin');
            if (data) {
                setMotel(data.data);
                setListYear(getListYear(new Date(data.data?.create_at).getFullYear()));
                let filter = {
                    motelId: props.match.params.id,
                    year: year
                }
                let dataBillAllMotel = await getBillAllMotel(filter);

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
    useEffect(() => {
        let getData = async () => {
            if (props.match.params.id) {
                let data = await getMotel(props.match.params.id, 'admin');
                if (data) {
                    setMotel(data.data);
                    setListYear(getListYear(new Date(data.data?.create_at).getFullYear()));
                    let filter = {
                        motelId: props.match.params.id,
                        year: year
                    }
                    let dataBillAllMotel = await getBillAllMotel(filter);

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
    return (
        <div className="bg-white m-4 rounded-4 shadow p-4">
            {motel && motel._id &&
                <>
                    <div className="row">
                        <Form className="col-2">
                            <Form.Select id="disabledSelect" onChange={(event) => { setYear(event.target.value) }}>
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
                        {motel.listRoom &&
                            < Table >
                                <thead>
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>Tên người dùng</th>
                                        <th>Số điện thoại</th>
                                        <th>Thời gian bắt đầu thuê</th>
                                        <th>Tạo phiếu</th>
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
                                                        <Button onClick={() => handleButton(item.inforHire[0], index)}>Tạo phiếu thu</Button>
                                                    </td>
                                                    <td>
                                                        <Link className="btn btn-primary" to={`/User/AllData/Room/${item._id}/1`}><i class="far fa-eye"></i></Link>
                                                    </td>
                                                    <td><Button variant="danger" onClick={() => { handleButtonModal(item.inforHire[0]) }}>Kết thúc hợp đồng</Button></td>
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
                                                        <Link className="btn btn-primary" to={`/User/AllData/Room/${item._id}/1`}><i class="far fa-eye"></i></Link>
                                                    </td>
                                                </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

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
                    <RemoveHire
                        hire={activeHire?._id}
                        modalName={"Hủy hợp đồng"}
                        show={handleRemoveHire}
                        handleClickChanges={handleButtonModal}
                        handleClickClose={handleButtonModal}
                        modalChanges={'Xác nhận'}
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
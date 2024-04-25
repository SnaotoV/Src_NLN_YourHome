import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { getFullDate, validDate } from "../../ultils/getFullDate";
import { getMotel } from '../../services/userServices';
import ModalAddBill from "../../components/ModalAddBill/ModalAddBill";
let InforHirePage = (props) => {
    let [motel, setMotel] = useState({});
    let [activeRoom, setActiveRoom] = useState({})
    let [handleModalAddBill, setHandleModalAddBill] = useState(false);
    let [index, setIndex] = useState({});
    // let handleModal = () => {
    //     setHandleModalAddBill(!handleModalAddBill)
    // }
    let handleButton = (item, index) => {
        setActiveRoom(item);
        setIndex(index)
        setHandleModalAddBill(!handleModalAddBill)
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
                }
            }
        }
        getData();
    }, [props.match.params.id])
    console.log(motel);
    return (
        <div className="bg-white m-4 rounded-4 shadow p-4">
            {motel && motel._id &&
                <>
                    <div className="row my-2">
                        <div className="col-4 fs-2">
                            <div>
                                Tổng thu:
                            </div>
                            <div className="bg-warning text-white text-center p-4 rounded-4">
                                {SumBill().all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                            </div>
                        </div>
                        <div className="col-4 fs-2">
                            <div>
                                Tổng đã thu:
                            </div>
                            <div className="bg-success text-white text-center p-4 rounded-4">
                                {SumBill().pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                            </div>
                        </div>
                        <div className="col-4 fs-2">
                            <div>
                                Tổng chưa thu:
                            </div>
                            <div className="bg-danger text-white text-center p-4 rounded-4">
                                {SumBill().indeb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                            </div>
                        </div>
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
                                        <th>Tổng tiền</th>
                                        <th>Phiếu thu</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {motel.listRoom.filter((item) => {
                                        return item.statusCode === 2;
                                    }).map((item, index) => {
                                        return (
                                            <tr className="text-center" key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.inforHire[0].user[0].fullName}</td>
                                                <td>{item.inforHire[0].user[0].phoneNumber}</td>
                                                <td>{getFullDate(item.inforHire[0].create_at)}</td>
                                                <td>{item.inforHire[0].bills.length > 0 ?
                                                    <div>
                                                        {item.inforHire[0].bills[0].statusCode === 6 ? getFullDate(item.inforHire[0].bills[0].date_pay) : <p className="text-danger">Chưa thanh toán</p>}
                                                    </div>
                                                    :
                                                    <div>
                                                        Đợi tạo phiếu thu

                                                    </div>
                                                }</td>
                                                <td>{item.inforHire[0].bills.length > 0 ?
                                                    <div>
                                                        {
                                                            Number((Number(item.inforHire[0].bills[0].price) + (item.inforHire[0].bills[0].valueE * motel.priceEW[0].priceE) + (item.inforHire[0].bills[0].valueW * motel.priceEW[0].priceW))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                                        }đ
                                                    </div>
                                                    :
                                                    <div>
                                                        Đợi tạo phiếu thu

                                                    </div>
                                                }
                                                </td>
                                                <td>
                                                    {item.inforHire[0].bills.length > 0 ? (item.inforHire[0].bills[0].statusCode === 7 ?
                                                        <p className="text-danger">
                                                            Chưa thanh toán
                                                        </p>
                                                        :
                                                        item.inforHire[0].bills[0].statusCode === 6 ?

                                                            <p className="text-success">
                                                                Đã thanh toán
                                                            </p>
                                                            : <></>
                                                    )
                                                        : (
                                                            <div className="primary">Không có đơn cần thanh toán</div>
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {item.inforHire[0].bills.length > 0 && validDate(item.inforHire[0].bills[0].date_end) ?
                                                        item.inforHire[0].bills[0].statusCode === 7 ?
                                                            <Button>Đã thanh toán trực tiếp</Button>
                                                            :
                                                            <p>Chưa qua tháng mới</p>
                                                        :
                                                        <Button onClick={() => handleButton(item.inforHire[0], index)}>Tạo phiếu thu</Button>
                                                    }
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
                        priceEW={motel.priceEW && motel.priceEW[0]}
                        room={activeRoom}
                        price={motel.price}
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
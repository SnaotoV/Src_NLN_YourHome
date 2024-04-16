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
        <div className="bg-white">
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
                                <th>Phiếu thu</th>
                                <th>Ngày thanh toán</th>
                                <th>Tổng tiền</th>
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
                                                {getFullDate(item.inforHire[0].bills[0].date_end)}
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
                            Hiện chưa có lịch hẹn xem phòng
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
import { useEffect, useState } from "react";
import { getCountMotel } from "../../services/appServices";
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Form } from "react-bootstrap";
let AdminStatistical = (props) => {
    let [year, setYear] = useState(new Date().getFullYear());

    let [barSale, setBarSale] = useState({
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu người dùng toàn hệ thống',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Doanh thu',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgb(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    })
    let [pieUser, setPieUser] = useState({
        labels: ["Người dùng ngưng hoạt động", "Người dùng hoạt động"],
        datasets: [
            {
                label: 'Người dùng',
                data: [0, 0],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    })
    let [pieMotel, setPieMotel] = useState({
        labels: ["Phòng trọ ngưng hoạt động", "Phòng trọ hoạt động"],
        datasets: [
            {
                label: 'Phòng trọ',
                data: [0, 0],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                borderWidth: 1,
            },
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    })
    let handleChangeYear = (event) => {
        let newYear = new Date(event.target.value).getFullYear();
        setYear(newYear)
    }
    useEffect(() => {
        let getData = async () => {
            let filter = {
                year: year
            }
            let data = await getCountMotel(filter);

            if (data.value.BarAllMotel) {
                let dataBarAll = new Array(12).fill(0);
                data.value.BarAllMotel.forEach((item, index) => {
                    dataBarAll[index] = item * 0.1;
                });
                setBarSale({
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Doanh thu người dùng toàn hệ thống',
                            data: data.value.BarAllMotel,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Doanh thu 10% doanh thu người dùng',
                            data: dataBarAll,
                            backgroundColor: 'rgb(255, 99, 132, 0.5)',
                            borderColor: 'rgb(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });

            }
            if (data.value.PieMotel) {
                setPieMotel({
                    labels: ["Phòng trọ ngưng hoạt động", "Phòng trọ hoạt động"],
                    datasets: [
                        {
                            label: 'Phòng trọ',
                            data: data.value.PieMotel,
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
            if (data.value.PieUser) {
                setPieUser({
                    labels: ["Người dùng ngưng hoạt động", "Người dùng hoạt động"],
                    datasets: [
                        {
                            label: 'Người dùng',
                            data: data.value.PieUser,
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        }
        getData();
    }, [year])

    useState(() => {
        let getData = async () => {
            let filter = {
                year: year
            }
            let data = await getCountMotel(filter);

            if (data.value.BarAllMotel) {
                let dataBarAll = new Array(12).fill(0);
                data.value.BarAllMotel.forEach((item, index) => {
                    dataBarAll[index] = item * 0.1;
                });
                setBarSale({
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Doanh thu người dùng toàn hệ thống',
                            data: data.value.BarAllMotel,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Doanh thu 10% doanh thu người dùng',
                            data: dataBarAll,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });

            }
            if (data.value.PieMotel) {
                setPieMotel({
                    labels: ["Phòng trọ ngưng hoạt động", "Phòng trọ hoạt động"],
                    datasets: [
                        {
                            label: 'Phòng trọ',
                            data: data.value.PieMotel,
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
            if (data.value.PieUser) {
                setPieUser({
                    labels: ["Người dùng ngưng hoạt động", "Người dùng hoạt động"],
                    datasets: [
                        {
                            label: 'Doanh thu 10% doanh thu người dùng',
                            data: data.value.PieUser,
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        }
        getData();
    }, [])
    return (
        <div className="row">
            <div className="col-3 p-4 row">
                <div className="col">
                    <Pie data={pieMotel} ></Pie>
                </div>
                <div className="col">
                    <Pie data={pieUser} ></Pie>
                </div>
            </div>
            <div className="col-9 p-4 row">
                <Form className="col-3">
                    <Form.Select onChange={(event) => {
                        handleChangeYear(event)
                    }}>
                        <option value={2024}>2024</option>
                        <option value={2023}>2023</option>
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                    </Form.Select>
                </Form>
                <Line data={barSale}></Line >
            </div>
        </div>
    )
}
export default AdminStatistical
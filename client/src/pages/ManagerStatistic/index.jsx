import { useEffect, useState } from 'react';
import { Select, Statistic, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './styles.css';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { getUserAction, getDayOrderTotalAction, getDayRevenueAction, getOrderTotalAction, getRevenueAction, getTotalRevenueAction, getUserInMonthAction } from '../../redux/actions';
export default function StatisticManager() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.statisticReducer);
    const getUserAdmin = useSelector(state => state.userReducer);
    const { revenueData, orderTotalData, dayRevenueData, dayOrderTotalData, totalRevenue, userInMonth } = getAdminContent;
    const { userList } = getUserAdmin;
    const [revenueYear, setRevenueYear] = useState(0);
    const [quantityYear, setQuantityYear] = useState(0);
    useEffect(() => {
        let d = new Date();
        dispatch(getUserAction());
        dispatch(getTotalRevenueAction());
        dispatch(getRevenueAction(d.getFullYear()));
        dispatch(getOrderTotalAction(d.getFullYear()));
        dispatch(getDayRevenueAction((d.getMonth() + 1), (d.getFullYear())));
        dispatch(getDayOrderTotalAction((d.getMonth() + 1), (d.getFullYear())));
        dispatch(getUserInMonthAction(d.getFullYear()));
        return () => {
        }
    }, [dispatch]);
    let newRevenueData = [];
    let newOrderTotalData = [];
    let newDayRevenueData = [];
    let newDayOrderTotalData = [];
    let newUserInMonth = [];
    userInMonth.forEach((item) => {
        let newData = {
            name: `Tháng ${item.thang}`,
            User: item.tonguser,
        }
        newUserInMonth.push(newData)
    })
    revenueData.forEach((item) => {
        let newData = {
            name: `Tháng ${item.thang}`,
            Revenue: item.DoanhThu,
        }
        newRevenueData.push(newData)
    })
    orderTotalData.forEach((item) => {
        let newData = {
            name: `Tháng ${item.thang}`,
            OrderTotal: item.tongsoluong,
        }
        newOrderTotalData.push(newData)
    })
    dayRevenueData.forEach((item) => {
        let newData = {
            name: `Ngày ${item.Ngay}`,
            RevenueDay: item.DoanhThuNgay,
        }
        newDayRevenueData.push(newData)
    })
    dayOrderTotalData.forEach((item) => {
        let newData = {
            name: `Ngày ${item.Ngay}`,
            OrderTotalDay: item.TongSoLuong,
        }
        newDayOrderTotalData.push(newData)
    })
    function revenueYearChange(value) {
        dispatch(getRevenueAction(value));
        setRevenueYear(value);
    }
    function orderYearChange(value) {
        dispatch(getOrderTotalAction(value));
        setQuantityYear(value);
    }
    function revenueMonthChange(value) {
        dispatch(getDayRevenueAction(value, revenueYear));
    }
    function orderMonthChange(value) {
        dispatch(getDayOrderTotalAction(value, quantityYear));
    }
    function userYearChange(value) {
        dispatch(getUserInMonthAction(value))
    }
    return (
        <>
            <Row gutter={16} className="total-statistic">
                <Col span={12} className="total-user">
                    <Statistic title="Số Lượng Người Dùng" value={userList?.length} />
                </Col>
                <Col span={12} className="total-credit">
                    <Statistic title="Tổng Doanh Thu (VND)" value={totalRevenue.DoanhThu} precision={2} />
                </Col>
            </Row>
            <div className="row-chart">
                <div className="row">
                    <div className="chart">
                        <div style={{ paddingBottom: '20px' }}>
                            <h3>Doanh Thu Theo Tháng Trong Năm</h3>
                            <Select placeholder="Chọn năm" onChange={revenueYearChange}>
                                <Select.Option value="2021">Năm 2021</Select.Option>
                                <Select.Option value="2020">Năm 2020</Select.Option>
                            </Select>
                        </div>
                        <div className="chart-info">
                            <BarChart
                                width={800}
                                height={400}
                                data={newRevenueData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 80,
                                    bottom: 5,
                                }}
                                barSize={20}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Revenue" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                    <div className="chart">
                        <div style={{ paddingBottom: '20px' }}>
                            <h3>Tổng Số Lượng Đơn Hàng Theo Tháng Trong Năm</h3>
                            <Select placeholder="Chọn năm" onChange={orderYearChange}>
                                <Select.Option value="2021">Năm 2021</Select.Option>
                                <Select.Option value="2020">Năm 2020</Select.Option>
                            </Select>
                        </div>
                        <div className="chart-info">
                            <BarChart
                                width={800}
                                height={400}
                                data={newOrderTotalData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 80,
                                    bottom: 5,
                                }}
                                barSize={20}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="OrderTotal" fill="#FF3333" />
                            </BarChart>
                        </div>
                    </div>
                </div>
                <div className="row-chart">
                    <div className="row">
                        <div className="chart">
                            <div style={{ paddingBottom: '20px' }}>
                                <h3>Doanh Thu Theo Ngày Trong Tháng</h3>
                                <Select placeholder="Chọn tháng" onChange={revenueMonthChange}>
                                    {revenueData.map((item, index) => {
                                        return <Select.Option key={index} value={item.thang}>Tháng {item.thang}</Select.Option>
                                    })}
                                </Select>
                            </div>
                            <div className="chart-info">
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={newDayRevenueData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 80,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="RevenueDay" fill="#009900" />
                                </BarChart>
                            </div>
                        </div>
                        <div className="chart">
                            <div style={{ paddingBottom: '20px' }}>
                                <h3>Tổng Số Lượng Đơn Hàng Theo Ngày Trong Tháng</h3>
                                <Select placeholder="Chọn tháng năm" onChange={orderMonthChange}>
                                    {orderTotalData.map((item, index) => {
                                        return <Select.Option key={index} value={item.thang}>Tháng {item.thang}</Select.Option>
                                    })}
                                </Select>
                            </div>
                            <div className="chart-info">
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={newDayOrderTotalData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 80,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="OrderTotalDay" fill="#00CCFF" />
                                </BarChart>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-chart">
                    <div className="row">
                        <div className="chart">
                            <div style={{ paddingBottom: '20px' }}>
                                <h3>Khách Hàng Mới Trong Tháng</h3>
                                <Select placeholder="Chọn năm" onChange={userYearChange}>
                                    <Select.Option value="2021">Năm 2021</Select.Option>
                                    <Select.Option value="2020">Năm 2020</Select.Option>
                                </Select>
                            </div>
                            <div className="chart-info">
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={newUserInMonth}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 80,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="User" fill="#009900" />
                                </BarChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
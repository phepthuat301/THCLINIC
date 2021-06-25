import { Table, Tag, Space, Input } from 'antd';

//REACT && REDUX
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { getServicesHistoryAction, removeServicesAction } from '../../redux/actions/services.action';

const { Column } = Table;

export default function ExamHistory() {
    const getAdminContent = useSelector(state => state.servicesReducer);
    const { serviceHistory } = getAdminContent;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getServicesHistoryAction());
        return () => {
            dispatch(removeServicesAction())
        }
    }, []);
    serviceHistory.forEach(item => {
        item.getTime = new Date(item.ngaytaikham).getTime();
        item.ngaytaikham = item.ngaytaikham.replace("T", " ").substr(0, 19)
    })

    ///////// SEARCH
    const [searchKey, setSearchKey] = useState('')
    const filterServices = serviceHistory.filter((item) => {
        return item.hoten.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
    });
    return (
        <>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h1 style={{ fontSize: '25px' }}>Lịch Sử Khám Bệnh</h1>
                <Input.Search
                        placeholder="Nhập họ tên khách hàng"
                        style={{width:"500px",marginBottom:"30px"}}
                        allowClear
                        enterButton="Tìm Kiếm"
                        size="large"
                        onSearch={(value) => setSearchKey(value)}
                    />
            </div>
            <Table dataSource={filterServices}>
                <Column title="Ngày Tái Khám" dataIndex="ngaytaikham" key="ngaytaikham" />
                <Column title="Họ Tên" dataIndex="hoten" key="hoten" />
                <Column title="Tên Dịch Vụ" dataIndex="tendichvu" key="tendichvu" />
                <Column
                        title="Tiến Trình Điều Trị"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Tag color="blue">{record.tientrinhdieutri}</Tag>/<Tag color="#2db7f5">{record.solandieutri}</Tag>
                            </Space>
                        )}
                    />
            </Table>
        </>
    )
}
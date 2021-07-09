import { Table, Tag, Space, Input } from 'antd';

//REACT && REDUX
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { getOrderAction, removeServicesAction } from '../../redux/actions/services.action';

const { Column } = Table;

export default function ReadOrder() {
    const getAdminContent = useSelector(state => state.servicesReducer);
    const { orderList } = getAdminContent;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderAction());
        return () => {
            dispatch(removeServicesAction())
        }
    }, [dispatch]);
    orderList.forEach(item => {
        item.getTime = new Date(item.ngaytao).getTime();
        item.ngaytao = item.ngaytao.replace("T", " ").substr(0, 19)
    })

    ///////// SEARCH
    const [searchKey, setSearchKey] = useState('')
    const filterOrder = orderList.filter((item) => {
        return item.hoten.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1 || item.madichvu.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
    });
    return (
        <>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h1 style={{ fontSize: '25px' }}>Quản Lý Hóa Đơn</h1>
                <Input.Search
                        placeholder="Nhập họ tên khách hàng"
                        style={{width:"500px",marginBottom:"30px"}}
                        allowClear
                        enterButton="Tìm Kiếm"
                        size="large"
                        onSearch={(value) => setSearchKey(value)}
                    />
            </div>
            <Table dataSource={filterOrder}>
                <Column title="Ngày Tạo" dataIndex="ngaytao" key="ngaytao" />
                <Column title="Họ Tên" dataIndex="hoten" key="hoten" />
                <Column title="Tên Dịch Vụ" dataIndex="tendichvu" key="tendichvu" />
                <Column title="Mã Dịch Vụ" dataIndex="madichvu" key="madichvu" />
                <Column
                        title="Giá Tiền"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Tag color="gold">{record.giatien.toLocaleString("vi-vn")} VNĐ</Tag>
                            </Space>
                        )}
                    />
            </Table>
        </>
    )
}
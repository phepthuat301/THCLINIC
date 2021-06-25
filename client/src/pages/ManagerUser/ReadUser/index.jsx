//CSS
import { Table, Row, Col, Space, Drawer, Button, Form, Select, Input, Checkbox } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import swal from 'sweetalert';
//REACT && REDUX
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createInvoiceAction, deleteUserAction, getActiveServicesAction, getUserAction, getUserDetailAction, removeServicesAction, removeUserAction, updateDieutriAction, updateUserAction } from "../../../redux/actions";



export default function ReadUser() {
    //STATE
    const [visible, setVisible] = useState(false);
    const [IDKH, setIDKH] = useState(null);
    const [IDDV, setIDDV] = useState(null);
    ////
    const [newsForm] = Form.useForm()
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.userReducer);
    const { userList, userDetail } = getAdminContent;
    const getServicesContent = useSelector(state => state.servicesReducer);
    const { activeServicesList } = getServicesContent;
    useEffect(() => {
        dispatch(getUserAction());
        dispatch(getActiveServicesAction())
        return () => {
            dispatch(removeUserAction())
            dispatch(removeServicesAction())
        }
    }, []);

    useEffect(() => {
        newsForm.resetFields();
    }, [userDetail.id_khachhang])

    function editUser(value) {
        const newValue = {
            ...value,
            id_khachhang: userDetail.id_khachhang
        }
        dispatch(updateUserAction(newValue))
        setVisible(false);
    }

    const showDrawer = (id) => {
        setIDKH(id);
        dispatch(getUserDetailAction(id));
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    userList.forEach(item => {
        item.key = item.id_khachhang
    })
    function createInvoice() {
        const newServices = activeServicesList.filter(item => item.id_dichvu === IDDV);
        const newCustomer = userList.filter(item => item.id_khachhang === IDKH)
        if (newServices[0].giatichluy && (newCustomer[0].diemtichluy >= newServices[0].giatichluy)) {
            dispatch(createInvoiceAction(IDKH, IDDV, newCustomer[0].diemtichluy - newServices[0].giatichluy))
        }
        if (newServices[0].giatichluy && (newCustomer[0].diemtichluy < newServices[0].giatichluy)) {
            swal("Đổi Dịch Vụ Thất Bại", "Khách Hàng Chưa Đủ Điểm Thưởng Để Đổi Dịch Vụ", "warning")
        }
        if (!newServices[0].giatichluy) {
            dispatch(createInvoiceAction(IDKH, IDDV))
        }

    }
    ////////////////////////

    function displayCheckBox(x) {
        let numArr = []
        for (let i = 0; i < x; i++) {
            numArr.push(i)
        }
        return numArr
    }
    ////////////
    function deleteUser(id) {
        swal({
            title: "Bạn Có Chắc Chắn Không?",
            text: "Một khi xóa, bạn sẽ không thể khôi phục lại file này",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteUserAction(id))
                } else {
                    swal("Dữ Liệu Của Bạn Đã Được Bảo Toàn!");
                }
            });
    }
    const columns = [

        { title: 'Ngày Đăng Ký', dataIndex: 'ngaykham', key: 'ngaykham' },
        { title: 'Điểm Tích Lũy', dataIndex: 'diemtichluy', key: 'diemtichluy' },
        { title: 'Người Giới Thiệu', dataIndex: 'nguoigioithieu', key: 'nguoigioithieu' },
        { title: 'Họ Tên', dataIndex: 'hoten', key: 'hoten' },
        { title: 'Địa Chỉ', dataIndex: 'diachi', key: 'diachi' },
        { title: 'Số Điện Thoại', dataIndex: 'sodienthoai', key: 'sodienthoai' },
        { title: 'Bệnh Lý', dataIndex: 'benhly', key: 'benhly' },
        { title: 'Ghi Chú', dataIndex: 'ghichu', key: 'ghichu' },
        {
            title: 'Action',
            key: 'id_khachhang',
            render: (record) => (
                <Space size="middle">
                    <EditTwoTone twoToneColor="#eb2f96" onClick={() => showDrawer(record.id_khachhang)} style={{ fontSize: '25px', marginLeft: '20px' }} />
                    <DeleteTwoTone onClick={() => deleteUser(record.id_khachhang)} twoToneColor='red' style={{ fontSize: '25px' }} />
                </Space>
            ),
        },
    ];

    function updateDieutri(id, num, id_kh, storageNum) {
        dispatch(updateDieutriAction(id, num, id_kh, storageNum))
    }
    ///////// SEARCH
    const [searchKey, setSearchKey] = useState('')
    const filterUserList = userList.filter((item) => {
        return item.hoten.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1 || item.sodienthoai.trim().indexOf(searchKey.trim()) !== -1;
    });
    const newCollums = [
        { title: 'Tên Dịch Vụ', dataIndex: 'tendichvu', key: 'tendichvu' },
        { title: 'Mã Dịch Vụ', dataIndex: 'madichvu', key: 'madichvu' },
        { title: 'Số Lần Điều Trị', dataIndex: 'solandieutri', key: 'solandieutri' },
        {
            title: 'Số Lần Đã Điều Trị',
            key: 'solandadieutri',
            render: (record) => (
                <Space size="middle">
                    {displayCheckBox(record.solandadieutri).map((item, index) => {
                        return <Checkbox defaultChecked disabled key={index} />
                    })}
                    {displayCheckBox(record.solandieutri - record.solandadieutri).map((item, index) => {
                        return <Checkbox onChange={() => updateDieutri(record.id_donhang, record.solandadieutri + 1, record.id_khachhang, record.diemtichluy + 1)} key={index} />
                    })}
                </Space>
            ),
        },
    ];

    userList.forEach(item => {
        item.getTime = new Date(item.ngaykham).getTime();
        item.ngaykham = item.ngaykham.replace("T", " ").substr(0, 19)
    })
    return (
        <>
            <Row style={{ marginTop: '30px' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <h1 style={{ fontSize: '25px' }}>Quản Lý Khách Hàng</h1>
                    <Input.Search
                        placeholder="Nhập họ tên khách hàng"
                        style={{ width: "500px", marginBottom: "30px" }}
                        allowClear
                        enterButton="Tìm Kiếm"
                        size="large"
                        onSearch={(value) => setSearchKey(value)}
                    />
                </div>
                <Col span={22} offset={1}>
                    <Table dataSource={filterUserList} columns={columns} pagination={{ position: ['bottomCenter'] }}
                        expandable={{
                            expandedRowRender: record => <Table style={{ marginBottom: '50px' }} columns={newCollums} dataSource={record.historyList} pagination={false} />,
                            rowExpandable: record => record.historyList[0]?.tendichvu,
                        }}
                    />
                </Col>
            </Row>


            <Drawer
                title="Basic Drawer"
                width={720}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Form
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                    form={newsForm}
                    initialValues={{
                        hoten: userDetail?.hoten,
                        sodienthoai: userDetail?.sodienthoai,
                        diachi: userDetail?.diachi,
                        benhly: userDetail?.benhly,
                        ghichu: userDetail?.ghichu,
                    }}
                    layout="vertical"
                    onFinish={editUser}
                    scrollToFirstError
                >
                    <Form.Item
                        className="form-in"
                        label="Tên Khách Hàng"
                        name="hoten"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền họ tên vào khung',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập họ tên của bệnh nhân..." />
                    </Form.Item>

                    <Form.Item
                        className="form-in"
                        label="Số Điện Thoại"
                        name="sodienthoai"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!'
                            },
                            {
                                min: 9,
                                message: 'Số điện thoại bạn vừa nhập không đúng định dạng'

                            },
                            {
                                required: true,
                                pattern: new RegExp("^[0-9]*$"),
                                message: "Số điện thoại chỉ bao gồm số, không bao gồm ký tự khác!"
                            }
                        ]}
                    >
                        <Input disabled placeholder="Nhập số điện thoại" addonBefore="+84" style={{ width: '100%' }} minLength="9" maxLength="10" />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="Địa Chỉ"
                        name="diachi"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ!',
                            },
                        ]}
                    >
                        <Input placeholder="Tòa Nhà, Tên Đường..." />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="Bệnh Lý"
                        name="benhly"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập bệnh lý!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập bệnh lý của bệnh nhân" />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="Ghi Chú"
                        name="ghichu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ghi chú!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập ghi chú của bệnh nhân" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Sửa Khách Hàng</Button>
                    </Form.Item>
                </Form >
                <div style={{ marginBottom: '30px' }} class="ant-drawer-header">
                    <div class="ant-drawer-title">Chọn Dịch Vụ</div>
                </div>
                <Select style={{ width: '500px', marginBottom: '20px' }} placeholder="Chọn dịch vụ" onChange={(value) => setIDDV(value)}>
                    {activeServicesList.map((item, index) => {
                        return <Select.Option key={index} value={item.id_dichvu}>{item.tendichvu}</Select.Option>
                    })}
                </Select>
                <br />
                <Button type="primary" onClick={createInvoice}>Xác Nhận</Button>
            </Drawer>
        </>

    )
}
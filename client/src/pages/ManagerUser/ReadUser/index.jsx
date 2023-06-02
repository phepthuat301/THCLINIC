//CSS
import { Table, Row, Col, Space, Drawer, Button, Form, Select, Input, Checkbox } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import swal from 'sweetalert';
//REACT && REDUX
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createInvoiceAction, deleteUserAction, getActiveServicesAction, getUserAction, removeServicesAction, removeUserAction, updateDieutriAction, updateUserAction } from "../../../redux/actions";



export default function ReadUser() {
    //STATE
    const [visible, setVisible] = useState(false);
    const [IDDV, setIDDV] = useState(null);
    const [userDetail, setUserDetail] = useState({});
    ////
    const [newsForm] = Form.useForm()
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.userReducer);
    const { userList } = getAdminContent;
    const getServicesContent = useSelector(state => state.servicesReducer);
    const { activeServicesList } = getServicesContent;

    useEffect(() => {
        dispatch(getUserAction());
        dispatch(getActiveServicesAction())
        return () => {
            dispatch(removeUserAction())
            dispatch(removeServicesAction())
        }
    }, [dispatch]);


    useEffect(() => {
        newsForm.resetFields();
    }, [userDetail, newsForm])

    const onSubmitSearch = (value) => {
        dispatch(getUserAction(value));
    }

    function editUser(value) {
        const newValue = {
            ...value,
            id: userDetail.id
        }
        dispatch(updateUserAction(newValue))
        setVisible(false);
    }

    const showDrawer = (item) => {
        setUserDetail(item);
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    userList.forEach(item => {
        item.key = item.id
    })
    function createInvoice() {
        dispatch(createInvoiceAction(userDetail.id, IDDV, 0))
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

        { title: 'Ngày Đăng Ký', dataIndex: 'created_at', key: 'created_at' },
        { title: 'Điểm Tích Lũy', dataIndex: 'reward_point', key: 'reward_point' },
        // { title: 'Người Giới Thiệu', dataIndex: 'nguoigioithieu', key: 'nguoigioithieu' },
        { title: 'Họ Tên', dataIndex: 'name', key: 'name' },
        { title: 'Địa Chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Số Điện Thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Bệnh Lý', dataIndex: 'pathological', key: 'pathological' },
        { title: 'Ghi Chú', dataIndex: 'note', key: 'note' },
        {
            title: 'Action',
            key: 'id',
            render: (record) => (
                <Space size="middle">
                    <EditTwoTone twoToneColor="#eb2f96" onClick={() => showDrawer(record)} style={{ fontSize: '25px', marginLeft: '20px' }} />
                    <DeleteTwoTone onClick={() => deleteUser(record.id)} twoToneColor='red' style={{ fontSize: '25px' }} />
                </Space>
            ),
        },
    ];

    function updateDieutri(id, num, id_kh, storageNum) {
        dispatch(updateDieutriAction(id, num, id_kh, storageNum))
    }

    const newCollums = [
        { title: 'Tên Dịch Vụ', dataIndex: 'item_name', key: 'item_name' },
        { title: 'Mã Dịch Vụ', dataIndex: 'item_code', key: 'item_code' },
        { title: 'Số Lần Điều Trị', dataIndex: 'total_treatment', key: 'total_treatment' },
        {
            title: 'Số Lần Đã Điều Trị',
            key: 'treatment_progress',
            render: (record) => (
                <Space size="middle">
                    {displayCheckBox(record.treatment_progress).map((item, index) => {
                        return <Checkbox defaultChecked disabled key={index} />
                    })}
                    {displayCheckBox(record.total_treatment - record.treatment_progress).map((item, index) => {
                        return <Checkbox onChange={() => updateDieutri(record.id, record.total_treat + 1, record.id_khachhang, record.reward_point + 1)} key={index} />
                    })}
                </Space>
            ),
        },
    ];

    userList.forEach(item => {
        item.getTime = new Date(item.created_at).getTime();
        item.created_at = item.created_at.replace("T", " ").substr(0, 19)
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
                        onSearch={(value) => onSubmitSearch(value)}
                    />
                </div>
                <Col span={22} offset={1}>
                    <Table
                        dataSource={userList}
                        columns={columns}
                        pagination={{ position: ['bottomCenter'] }}
                        expandable={{
                            expandedRowRender: record => <Table style={{ marginBottom: '50px' }} columns={newCollums} dataSource={record.orders} pagination={false} />,
                            rowExpandable: record => record.orders[0]?.item_name,
                        }}
                    />
                </Col>
            </Row>


            <Drawer
                title="Chỉnh Sửa Khách Hàng"
                width={720}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Form
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                    form={newsForm}
                    initialValues={{
                        name: userDetail?.name,
                        phone: userDetail?.phone,
                        address: userDetail?.address,
                        pathological: userDetail?.pathological,
                        note: userDetail?.note,
                    }}
                    layout="vertical"
                    onFinish={editUser}
                    scrollToFirstError
                >
                    <Form.Item
                        className="form-in"
                        label="Tên Khách Hàng"
                        name="name"
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
                        name="phone"
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
                        <Input placeholder="Nhập số điện thoại" addonBefore="+84" style={{ width: '100%' }} minLength="9" maxLength="10" />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="Địa Chỉ"
                        name="address"
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
                        name="pathological"
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
                        name="note"
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
                <Select
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: '500px', marginBottom: '20px' }}
                    placeholder="Chọn dịch vụ"
                    onChange={(value) => setIDDV(value)}
                >
                    {activeServicesList.map((item, index) => {
                        return <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                    })}
                </Select>
                <br />
                <Button type="primary" onClick={createInvoice}>Xác Nhận</Button>
            </Drawer>
        </>

    )
}
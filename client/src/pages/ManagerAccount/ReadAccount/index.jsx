//CSS
import { Table, Row, Col, Space, Input, Drawer, Select, Button, Form, Tag } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import swal from 'sweetalert';
//REACT && REDUX
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editAccountAction, getAccountAction, getAccountDetailAction, getRoleAction, removeAccountAction, resetPasswordAction } from '../../../redux/actions';
//Components
import history from '../../../utils/history'

export default function ReadAccount() {

    ////
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.accountReducer);
    const { accountList, accountDetail, role } = getAdminContent;
    ///
    useEffect(() => {
        dispatch(getAccountAction());
        dispatch(getRoleAction())
        return () => {
            dispatch(removeAccountAction())
        }
    }, [dispatch]);

    const [newsForm] = Form.useForm()

    useEffect(() => {
        newsForm.resetFields();
    }, [])

    function displayRole(role) {
        if (role === "admin") {
            return <Tag color="red">BOSS</Tag>
        }
        else if (role === "manager") {
            return <Tag color="blue">Quản Lý</Tag>
        }
        else if (role === "user") {
            return <Tag color="purple">Nhân Viên</Tag>
        }
    }
    if (role.role) {
        if (role.role !== "admin") {
            swal("Xin Lỗi", "Bạn không đủ quyền truy cập vào chức năng này", "error")
            history.push('/')
        }
    }
    
    ///STATE
    const [visible, setVisible] = useState(false);
    const [searchKey, setSearchKey] = useState('')
    const filterAccountList = accountList.filter((item) => {
        return item.email.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1 || item.username.trim().indexOf(searchKey.trim()) !== -1;
    });
    const columns = [
        { title: 'Tên Tài Khoản', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Vai Trò',
            key: 'role',
            render: (record) => (
                displayRole(record.role)
            ),
        },
        {
            title: "Mật khẩu",
            key: "password",
            render: (record) => (
                <>
                    <span>*********</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => dispatch(resetPasswordAction(record.id_qtv))} >
                        <EditTwoTone style={{ fontSize: '25px' }} />
                        <span>Reset</span>
                    </span>
                </>
            )
        },
        {
            title: 'Trạng Thái',
            key: 'trangthai',
            render: (record) => (
                record.trangthai === 1 ? "Kích Hoạt" : "Không Kích Hoạt"
            ),
        },
        {
            title: 'Action',
            key: 'id_qtv',
            render: (record) => (
                <Space size="middle">
                    {role.token !== record.token && (
                        <EditTwoTone twoToneColor="#eb2f96" onClick={() => showDrawer(record.id_qtv)} style={{ fontSize: '25px', marginLeft: '20px' }} />
                    )}
                </Space>
            ),
        },
    ];
    const onClose = () => {
        setVisible(false);
    };

    function showDrawer(id) {
        dispatch(getAccountDetailAction(id))
        setVisible(true);
    }

    function editAccount(value) {
        const newValue = {
            ...value,
            id_qtv: accountDetail.id_qtv,
        }
        dispatch(editAccountAction(newValue))
        setVisible(false)
    }
    return (
        <>
            <Row style={{ marginTop: '30px' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <h1 style={{ fontSize: '25px' }}>Quản Lý Tài Khoản</h1>
                    <Input.Search
                        placeholder="Nhập họ tên tài khoản"
                        style={{ width: "500px", marginBottom: "30px" }}
                        allowClear
                        enterButton="Tìm Kiếm"
                        size="large"
                        onSearch={(value) => setSearchKey(value)}
                    />
                </div>
                <Col span={22} offset={1}>
                    <Table dataSource={filterAccountList} columns={columns} pagination={{ position: ['bottomCenter'] }} />
                </Col>
            </Row>
            <Drawer
                title="Chỉnh Sửa Vai Trò"
                width={500}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Form
                    initialValues={{
                        role: accountDetail?.role,
                        trangthai: accountDetail?.trangthai,
                    }}
                    onFinish={editAccount}
                    layout="vertical"
                    scrollToFirstError
                    form={newsForm}
                >
                    <Form.Item
                        label="Vai Trò"
                        className="form-in"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn vai trò',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn vai trò...">
                            <Select.Option value="manager">Quản Lý</Select.Option>
                            <Select.Option value="user">Nhân Viên</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Trạng Thái"
                        name="trangthai"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn trạng thái...',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn trạng thái...">
                            <Select.Option value={1}>Kích Hoạt</Select.Option>
                            <Select.Option value={0}>Không Kích Hoạt</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Chỉnh Sửa Tài Khoản</Button>
                    </Form.Item>
                </Form >
            </Drawer>
        </>
    )
}
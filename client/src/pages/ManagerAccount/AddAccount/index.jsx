//CSS 
import { Form, Input, Button, Select } from 'antd';
import swal from 'sweetalert';

//REACT & REDUX
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addAccountAction, getRoleAction, removeAccountAction } from '../../../redux/actions';
////
import history from '../../../utils/history';

export default function AddAccount() {
    const dispatch = useDispatch();
    
    const getAdminContent = useSelector(state => state.accountReducer);
    const { role } = getAdminContent;
    function addAccount(value) {
        dispatch(addAccountAction(value))
    }
    useEffect(() => {
        dispatch(getRoleAction())
        return () => {
            dispatch(removeAccountAction())
        }
    }, [dispatch]);

    if (role.role) {
        if (role.role !== "admin") {
            swal("Xin Lỗi", "Bạn không đủ quyền truy cập vào chức năng này", "error")
            history.push('/')
        }
    }
    return (
        <>
            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f1f1f1' }}>
                <h1 style={{ fontSize: '25px' }}>Thêm Tài Khoản</h1>
            </div>
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={addAccount}
                layout="vertical"
                scrollToFirstError
            >

                <Form.Item
                    label="Email"
                    className="form-in"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email bạn nhập không hợp lệ!',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập Email!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập email..." />
                </Form.Item>

                <Form.Item
                    label="Tên Tài Khoản"
                    className="form-in"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên tài khoản',
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên tài khoản..." />
                </Form.Item>

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
                        <Select.Option value="1">Kích Hoạt</Select.Option>
                        <Select.Option value="0">Không Kích Hoạt</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm Tài Khoản</Button>
                </Form.Item>
            </Form >
        </>
    )
}
import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addUserAction, getUserAction, removeUserAction } from "../../../redux/actions";
export default function AddUser() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.userReducer);
    const { userList } = getAdminContent;
    function addUser(value) {
        let newPhone = value.sodienthoai.substring(0, 1)
        if (newPhone === "0") {
            newPhone = value.sodienthoai.slice(1)
        } else {
            newPhone = value.sodienthoai;
        }
        const newValue = {
            ...value,
            sodienthoai: newPhone,
        }
        dispatch(addUserAction(newValue))
    }
    useEffect(() => {
        dispatch(getUserAction());
        return () => {
            dispatch(removeUserAction())
        }
    }, [dispatch]);
    return (
        <>
            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f1f1f1' }}>
                <h1 style={{ fontSize: '25px' }}>Thêm Khách Hàng</h1>
            </div>
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={addUser}
                scrollToFirstError
            >
                <Form.Item
                    className="form-in"
                    name="id_nguoigioithieu"
                >
                    <Select
                        showSearch
                        placeholder="Chọn người giới thiệu"
                        filterOption={(input, option) => 
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {userList.map((item,index)=>{
                            return <Select.Option key={index} value={item.id_khachhang}>{item.hoten}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    className="form-in"
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
                    <Input placeholder="Nhập số điện thoại" addonBefore="+84" style={{ width: '100%' }} minLength="9" maxLength="10" />
                </Form.Item>
                <Form.Item
                    className="form-in"
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
                    name="ghichu"
                >
                    <Input placeholder="Nhập ghi chú của bệnh nhân" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm Khách Hàng</Button>
                </Form.Item>
            </Form >
        </>
    )
}
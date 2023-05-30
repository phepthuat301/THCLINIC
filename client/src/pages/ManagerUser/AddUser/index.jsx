import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addUserAction, getUserAction, removeUserAction } from "../../../redux/actions";
import { Genders } from '../../../utils/constant';
export default function AddUser() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.userReducer);
    const { userList } = getAdminContent;
    const [inputValue, setInputValue] = useState('');

    function addUser(value) {
        let newPhone = value.phone.substring(0, 1)
        if (newPhone === "0") {
            newPhone = value.phone.slice(1)
        } else {
            newPhone = value.phone;
        }
        const newValue = {
            ...value,
            phone: newPhone,
            date_of_birth: value.date_of_birth.toDate()
        }
        dispatch(addUserAction(newValue))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(getUserAction(inputValue));
        }
    };
    
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
                    name="referral_code"
                >
                    <Select
                        showSearch
                        placeholder="Chọn người giới thiệu"
                        onInputKeyDown={handleKeyDown}
                        onSearch={(value) => setInputValue(value)}
                    >
                        {userList.map((item, index) => {
                            return <Select.Option key={index} value={item.refferal_code}>{item.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    className="form-in"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn giới tính',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Giới Tính"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {Genders.map((item, index) => {
                            return <Select.Option key={index} value={item}>{item}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    className="form-in"
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
                    name="note"
                >
                    <Input placeholder="Nhập ghi chú của bệnh nhân" />
                </Form.Item>
                <Form.Item
                    className="form-in"
                    name="date_of_birth"
                >
                    <DatePicker placeholder='Ngày sinh' />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm Khách Hàng</Button>
                </Form.Item>
            </Form >
        </>
    )
}
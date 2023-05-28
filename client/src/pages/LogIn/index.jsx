import { Form, Input, Button, Row, Col } from 'antd';
//
import React from 'react'
import { useDispatch } from "react-redux";
import { loginAction } from '../../redux/actions/user.action';

export default function LogIn() {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(loginAction(values))
    };
    document.title = "Đăng Nhập | Thiện Hiếu"
    return (
        <section className='login-section'>
            <Row style={{ paddingTop: '15%' }}>
                <Col className='login-form' span={12} offset={6}>
                    <h1 style={{ textAlign: 'center' }}>THIEN HIEU Clinic Management</h1>
                    <Form
                        name="basic"
                        layout="vertical"
                        style={{ width: '100%' }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tên Đăng Nhập"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật Khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit">Đăng Nhập</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </section>
    )
}
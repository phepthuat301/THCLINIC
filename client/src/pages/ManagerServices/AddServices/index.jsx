import { Form, Input, Button, Select, Row, Col, InputNumber } from 'antd';
import { useState } from 'react';
//REACT && REDUX
import { useDispatch } from "react-redux";
import { addServicesAction } from '../../../redux/actions';
import { itemPaymentEnum } from '../../../utils/constant';

export default function AddServices() {
    const [payment, setPayment] = useState(itemPaymentEnum.MONEY);
    const dispatch = useDispatch();
    function addServices(value) {
        if (payment === itemPaymentEnum.MONEY) {
            delete value.reward_point;
        }
        if (payment === itemPaymentEnum.POINT) {
            delete value.money;
        }
        dispatch(addServicesAction(value));
    }
    const onSelectChange = (value) => {
        setPayment(value)
    }
    return (
        <Row style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h1 style={{ fontSize: '25px' }}>Thêm Dịch Vụ</h1>
            </div>
            <Col span={20} offset={2}>
                <Form
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={addServices}
                    scrollToFirstError
                >

                    <Form.Item

                        className="form-in"
                        label="Tên Dịch Vụ: "
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền tên dịch vụ',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên dịch vụ..." />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="Mã Dịch Vụ: "
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền mã dịch vụ',
                            },
                        ]}
                    >
                        <Input placeholder="Mã dịch vụ nên là các chữ cái đầu của tên dịch vụ..." />
                    </Form.Item>
                    <Form.Item
                        label="Loại Thanh Toán"
                        name="payment_method"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn hình thức thanh toán...',
                            },
                        ]}
                    >
                        <Select
                            onChange={(value) => onSelectChange(value)}
                            placeholder="Hình thức thanh toán..."
                        >
                            <Select.Option value={itemPaymentEnum.MONEY}>VNĐ</Select.Option>
                            <Select.Option value={itemPaymentEnum.POINT}>Điểm</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Giá Dịch Vụ: "
                        name="price"
                    >
                        <InputNumber
                            disabled={payment === itemPaymentEnum.POINT}
                            style={{ width: 500 }}
                            min={0}
                            max={10000000}
                            formatter={value => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/VNĐ\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Điểm tích lũy: "
                        name="reward_point"
                    >
                        <InputNumber
                            disabled={payment === itemPaymentEnum.MONEY}
                            style={{ width: 500 }}
                            min={0}
                            max={1000}
                            formatter={value => `Điểm ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/Điểm\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số Lần Điều Trị: "
                        name="number_of_treatments"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lần điều trị...',
                            },

                        ]}
                    >
                        <InputNumber
                            style={{ width: 500 }}
                            min={1}
                            max={10}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Thêm Dịch Vụ</Button>
                    </Form.Item>
                </Form >
            </Col>
        </Row>
    )
}
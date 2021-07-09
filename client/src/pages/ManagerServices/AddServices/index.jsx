import { Form, Input, Button, Select, Row, Col, InputNumber } from 'antd';
//REACT && REDUX
import { useDispatch } from "react-redux";
import { addServicesAction } from '../../../redux/actions';

export default function AddServices() {
    const dispatch = useDispatch();
    function addServices(value) {
        dispatch(addServicesAction(value));
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
                        name="tendv"
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
                        name="madv"
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
                    <Form.Item
                        label="Giá Dịch Vụ: "
                        name="giadv"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá dịch vụ...',
                            },

                        ]}
                    >
                        <InputNumber
                            style={{ width: 500 }}
                            min={0}
                            max={10000000}
                            formatter={value => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/VNĐ\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Điểm tích lũy: "
                        name="giatichluy"
                    >
                        <InputNumber
                            style={{ width: 500 }}
                            min={0}
                            max={1000}
                            formatter={value => `Điểm ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/Điểm\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số Lần Điều Trị: "
                        name="solandieutri"
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
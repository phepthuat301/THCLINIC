import { Table, Row, Col, Space, Drawer, Button, Form, Select, Input, InputNumber, } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import swal from 'sweetalert';
//REACT && REDUX
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { deleteServiceAction, getServicesAction, removeServicesAction, updateServicesAction } from '../../../redux/actions';
import { itemPaymentEnum, itemStatusEnum } from '../../../utils/constant';

export default function ReadServices() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.servicesReducer);
    const { servicesList } = getAdminContent;
    const [visible, setVisible] = useState(false);
    const [serviceDetail, setServiceDetail] = useState({});
    const [payment, setPayment] = useState(itemPaymentEnum.MONEY);
    const [newsForm] = Form.useForm()

    useEffect(() => {
        dispatch(getServicesAction());
        return () => {
            dispatch(removeServicesAction())
        }
    }, [dispatch]);

    useEffect(() => {
        newsForm.resetFields();
    }, [serviceDetail.id, newsForm])

    const showDrawer = (item) => {
        setServiceDetail(item)
        setPayment(item.payment)
        setVisible(true);
    };

    function editServices(value) {
        const newValue = {
            ...value,
            id: serviceDetail.id,
        }
        setVisible(false);
        dispatch(updateServicesAction(newValue))
    }

    const onClose = () => {
        setVisible(false);
    };

    function deleteService(id) {
        console.log(id)
        swal({
            title: "Bạn Có Chắc Chắn Không?",
            text: "Một khi xóa, bạn sẽ không thể khôi phục lại file này",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteServiceAction(id))
                } else {
                    swal("Dữ Liệu Của Bạn Đã Được Bảo Toàn!");
                }
            });
    }
    //Kiến Trúc Bảng
    const columns = [
        { title: 'Tên Dịch Vụ', dataIndex: 'name', key: 'name' },
        { title: 'Mã Dịch Vụ', dataIndex: 'code', key: 'code' },
        {
            title: 'Giá Tiền',
            key: 'price',
            render: (record) => (
                record.price.toLocaleString('vi-VN') + " VNĐ"
            ),
        },
        {
            title: 'Giá Điểm Tích Lũy',
            key: 'reward_point',
            render: (record) => (
                <>
                    {record.giatichluy ? (
                        record.reward_point.toLocaleString('vi-VN') + " Điểm"
                    ) : (
                        "Không"
                    )}
                </>
            ),
        },
        { title: 'Số Lần Điều Trị', dataIndex: 'number_of_treatments', key: 'number_of_treatments' },
        {
            title: 'Trạng Thái',
            key: 'status',
            render: (record) => (
                record.status === itemStatusEnum.ACTIVE ? "Kích Hoạt" : "Không Kích Hoạt"
            ),
        },
        {
            title: 'Action',
            key: 'id',
            render: (record) => (
                <Space size="middle">
                    <EditTwoTone twoToneColor="#eb2f96" onClick={() => showDrawer(record)} style={{ fontSize: '25px', marginLeft: '20px' }} />
                    <DeleteTwoTone onClick={() => deleteService(record.id)} twoToneColor='red' style={{ fontSize: '25px' }} />
                </Space>
            ),
        },
    ];
    return (
        <>
            <Row style={{ marginTop: '30px' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <h1 style={{ fontSize: '25px' }}>Quản Lý Dịch Vụ</h1>
                </div>
                <Col span={22} offset={1}>
                    <Table dataSource={servicesList} columns={columns} pagination={{ position: ['bottomCenter'] }} />
                </Col>
            </Row>
            <Drawer
                title="Sửa dịch vụ"
                width={720}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        name: serviceDetail?.name,
                        code: serviceDetail?.code,
                        status: serviceDetail?.status,
                        price: serviceDetail?.price,
                        reward_point: serviceDetail?.reward_point ?? 0,
                        number_of_treatments: serviceDetail?.number_of_treatments,
                        payment: serviceDetail?.payment,
                    }}
                    onFinish={editServices}
                    scrollToFirstError
                    form={newsForm}
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
                        <Input disabled placeholder="Mã dịch vụ nên là các chữ cái đầu của tên dịch vụ..." />
                    </Form.Item>
                    <Form.Item

                        label="Trạng Thái"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn trạng thái...',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn trạng thái...">
                            <Select.Option value={itemStatusEnum.ACTIVE}>Kích Hoạt</Select.Option>
                            <Select.Option value={itemStatusEnum.INACTIVE}>Không Kích Hoạt</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Loại Thanh Toán"
                        name="payment"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn hình thức thanh toán...',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Hình thức thanh toán..."
                            disabled
                        >
                            <Select.Option value={itemPaymentEnum.MONEY}>VNĐ</Select.Option>
                            <Select.Option value={itemPaymentEnum.POINT}>Điểm</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Giá Dịch Vụ: "
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá dịch vụ...',
                            },

                        ]}
                    >
                        <InputNumber
                            style={{ width: 500 }}
                            min={1}
                            max={10000000}
                            formatter={value => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/VNĐ\s?|(,*)/g, '')}
                            disabled={payment === itemPaymentEnum.POINT}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Điểm tích lũy: "
                        name="reward_point"
                    >
                        <InputNumber
                            style={{ width: 500 }}
                            min={0}
                            max={1000}
                            formatter={value => `Điểm ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/Điểm\s?|(,*)/g, '')}
                            disabled={payment === itemPaymentEnum.MONEY}
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
                        <Button type="primary" htmlType="submit">Sửa Dịch Vụ</Button>
                    </Form.Item>
                </Form >
            </Drawer>
        </>
    )
}
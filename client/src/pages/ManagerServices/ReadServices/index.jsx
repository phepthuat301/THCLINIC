import { Table, Row, Col, Space, Drawer, Button, Form, Select, Input, InputNumber, } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import swal from 'sweetalert';
//REACT && REDUX
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { deleteServiceAction, getServicesAction, getServicesDetailAction, removeServicesAction, updateServicesAction } from '../../../redux/actions';

export default function ReadServices() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.servicesReducer);
    const { servicesList, serviceDetail } = getAdminContent;
    const [visible, setVisible] = useState(false);
    const [newsForm] = Form.useForm()
    useEffect(() => {
        dispatch(getServicesAction());
        return () => {
            dispatch(removeServicesAction())
        }
    }, []);
    useEffect(() => {
        newsForm.resetFields();
    }, [servicesList.id_dichvu])

    const showDrawer = (id) => {
        dispatch(getServicesDetailAction(id));
        setVisible(true);
    };

    function editServices(value) {
        const newValue = {
            ...value,
            id_dichvu: serviceDetail.id_dichvu,
        }
        setVisible(false);
        dispatch(updateServicesAction(newValue))
    }

    const onClose = () => {
        setVisible(false);
    };

    function deleteService(id_dichvu) {
        swal({
            title: "Bạn Có Chắc Chắn Không?",
            text: "Một khi xóa, bạn sẽ không thể khôi phục lại file này",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteServiceAction(id_dichvu))
                } else {
                    swal("Dữ Liệu Của Bạn Đã Được Bảo Toàn!");
                }
            });
    }
    //Kiến Trúc Bảng
    const columns = [
        { title: 'Tên Dịch Vụ', dataIndex: 'tendichvu', key: 'tendichvu' },
        { title: 'Mã Dịch Vụ', dataIndex: 'madichvu', key: 'madichvu' },
        {
            title: 'Giá Tiền',
            key: 'giatien',
            render: (record) => (
                record.giatien.toLocaleString('vi-VN') + " VNĐ"
            ),
        },
        {
            title: 'Giá Điểm Tích Lũy',
            key: 'giatichluy',
            render: (record) => (
                <>
                    {record.giatichluy ? (
                        record.giatichluy.toLocaleString('vi-VN') + " Điểm"
                    ):(
                        "Không"
                    )}
                </>
            ),
        },
        { title: 'Số Lần Điều Trị', dataIndex: 'solandieutri', key: 'solandieutri' },
        {
            title: 'Trạng Thái',
            key: 'trangthai',
            render: (record) => (
                record.trangthai === 1 ? "Kích Hoạt" : "Không Kích Hoạt"
            ),
        },
        {
            title: 'Action',
            key: 'id_dichvu',
            render: (record) => (
                <Space size="middle">
                    <EditTwoTone twoToneColor="#eb2f96" onClick={() => showDrawer(record.id_dichvu)} style={{ fontSize: '25px', marginLeft: '20px' }} />
                    <DeleteTwoTone onClick={() => deleteService(record.id_dichvu)} twoToneColor='red' style={{ fontSize: '25px' }} />
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
                title="Basic Drawer"
                width={720}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        tendv: serviceDetail?.tendichvu,
                        madv: serviceDetail?.madichvu,
                        trangthai: serviceDetail?.trangthai,
                        giadv: serviceDetail?.giatien,
                        solandieutri: serviceDetail?.solandieutri,
                    }}
                    onFinish={editServices}
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
                        <Input disabled placeholder="Nhập tên dịch vụ..." />
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
                        <Input disabled placeholder="Mã dịch vụ nên là các chữ cái đầu của tên dịch vụ..." />
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
                            min={1}
                            max={10000000}
                            formatter={value => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\VNĐ\s?|(,*)/g, '')}
                            disabled
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
                            disabled
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
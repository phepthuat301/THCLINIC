//CSS
import { Table, Row, Col, Space, Drawer, Button, Form, Select, Input, Checkbox } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import swal from 'sweetalert';
//REACT && REDUX
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createInvoiceAction, deleteUserAction, getActiveServicesAction, getUserAction, getUserDetailAction, removeServicesAction, removeUserAction, updateDieutriAction, updateUserAction } from "../../../redux/actions";



export default function ReadUser() {
    //STATE
    const [visible, setVisible] = useState(false);
    const [IDKH, setIDKH] = useState(null);
    const [IDDV, setIDDV] = useState(null);
    ////
    const [newsForm] = Form.useForm()
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.userReducer);
    const { userList, userDetail } = getAdminContent;
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
    }, [userDetail.id_khachhang, newsForm])

    function editUser(value) {
        const newValue = {
            ...value,
            id_khachhang: userDetail.id_khachhang
        }
        dispatch(updateUserAction(newValue))
        setVisible(false);
    }

    const showDrawer = (id) => {
        setIDKH(id);
        dispatch(getUserDetailAction(id));
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    userList.forEach(item => {
        item.key = item.id_khachhang
    })
    function createInvoice() {
        const newServices = activeServicesList.filter(item => item.id_dichvu === IDDV);
        const newCustomer = userList.filter(item => item.id_khachhang === IDKH)
        if (newServices[0].giatichluy && (newCustomer[0].diemtichluy >= newServices[0].giatichluy)) {
            dispatch(createInvoiceAction(IDKH, IDDV, newCustomer[0].diemtichluy - newServices[0].giatichluy))
        }
        if (newServices[0].giatichluy && (newCustomer[0].diemtichluy < newServices[0].giatichluy)) {
            swal("?????i D???ch V??? Th???t B???i", "Kh??ch H??ng Ch??a ????? ??i???m Th?????ng ????? ?????i D???ch V???", "warning")
        }
        if (!newServices[0].giatichluy) {
            if (IDDV === null) {
                swal("Vui l??ng ch???n d???ch v???", "", "warning")
            } else {
                dispatch(createInvoiceAction(IDKH, IDDV))
            }
        }
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
            title: "B???n C?? Ch???c Ch???n Kh??ng?",
            text: "M???t khi x??a, b???n s??? kh??ng th??? kh??i ph???c l???i file n??y",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteUserAction(id))
                } else {
                    swal("D??? Li???u C???a B???n ???? ???????c B???o To??n!");
                }
            });
    }
    const columns = [

        { title: 'Ng??y ????ng K??', dataIndex: 'ngaykham', key: 'ngaykham' },
        { title: '??i???m T??ch L??y', dataIndex: 'diemtichluy', key: 'diemtichluy' },
        { title: 'Ng?????i Gi???i Thi???u', dataIndex: 'nguoigioithieu', key: 'nguoigioithieu' },
        { title: 'H??? T??n', dataIndex: 'hoten', key: 'hoten' },
        { title: '?????a Ch???', dataIndex: 'diachi', key: 'diachi' },
        { title: 'S??? ??i???n Tho???i', dataIndex: 'sodienthoai', key: 'sodienthoai' },
        { title: 'B???nh L??', dataIndex: 'benhly', key: 'benhly' },
        { title: 'Ghi Ch??', dataIndex: 'ghichu', key: 'ghichu' },
        {
            title: 'Action',
            key: 'id_khachhang',
            render: (record) => (
                <Space size="middle">
                    <EditTwoTone twoToneColor="#eb2f96" onClick={() => showDrawer(record.id_khachhang)} style={{ fontSize: '25px', marginLeft: '20px' }} />
                    <DeleteTwoTone onClick={() => deleteUser(record.id_khachhang)} twoToneColor='red' style={{ fontSize: '25px' }} />
                </Space>
            ),
        },
    ];

    function updateDieutri(id, num, id_kh, storageNum) {
        dispatch(updateDieutriAction(id, num, id_kh, storageNum))
    }
    ///////// SEARCH
    const [searchKey, setSearchKey] = useState('')
    const filterUserList = userList.filter((item) => {
        return item.hoten.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1 || item.sodienthoai.trim().indexOf(searchKey.trim()) !== -1;
    });
    const newCollums = [
        { title: 'T??n D???ch V???', dataIndex: 'tendichvu', key: 'tendichvu' },
        { title: 'M?? D???ch V???', dataIndex: 'madichvu', key: 'madichvu' },
        { title: 'S??? L???n ??i???u Tr???', dataIndex: 'solandieutri', key: 'solandieutri' },
        {
            title: 'S??? L???n ???? ??i???u Tr???',
            key: 'solandadieutri',
            render: (record) => (
                <Space size="middle">
                    {displayCheckBox(record.solandadieutri).map((item, index) => {
                        return <Checkbox defaultChecked disabled key={index} />
                    })}
                    {displayCheckBox(record.solandieutri - record.solandadieutri).map((item, index) => {
                        return <Checkbox onChange={() => updateDieutri(record.id_donhang, record.solandadieutri + 1, record.id_khachhang, record.diemtichluy + 1)} key={index} />
                    })}
                </Space>
            ),
        },
    ];

    userList.forEach(item => {
        item.getTime = new Date(item.ngaykham).getTime();
        item.ngaykham = item.ngaykham.replace("T", " ").substr(0, 19)
    })
    return (
        <>
            <Row style={{ marginTop: '30px' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <h1 style={{ fontSize: '25px' }}>Qu???n L?? Kh??ch H??ng</h1>
                    <Input.Search
                        placeholder="Nh???p h??? t??n kh??ch h??ng"
                        style={{ width: "500px", marginBottom: "30px" }}
                        allowClear
                        enterButton="T??m Ki???m"
                        size="large"
                        onSearch={(value) => setSearchKey(value)}
                    />
                </div>
                <Col span={22} offset={1}>
                    <Table dataSource={filterUserList} columns={columns} pagination={{ position: ['bottomCenter'] }}
                        expandable={{
                            expandedRowRender: record => <Table style={{ marginBottom: '50px' }} columns={newCollums} dataSource={record.historyList} pagination={false} />,
                            rowExpandable: record => record.historyList[0]?.tendichvu,
                        }}
                    />
                </Col>
            </Row>


            <Drawer
                title="Ch???nh S???a Kh??ch H??ng"
                width={720}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Form
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                    form={newsForm}
                    initialValues={{
                        hoten: userDetail?.hoten,
                        sodienthoai: userDetail?.sodienthoai,
                        diachi: userDetail?.diachi,
                        benhly: userDetail?.benhly,
                        ghichu: userDetail?.ghichu,
                    }}
                    layout="vertical"
                    onFinish={editUser}
                    scrollToFirstError
                >
                    <Form.Item
                        className="form-in"
                        label="T??n Kh??ch H??ng"
                        name="hoten"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ??i???n h??? t??n v??o khung',
                            },
                        ]}
                    >
                        <Input placeholder="Nh???p h??? t??n c???a b???nh nh??n..." />
                    </Form.Item>

                    <Form.Item
                        className="form-in"
                        label="S??? ??i???n Tho???i"
                        name="sodienthoai"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p s??? ??i???n tho???i!'
                            },
                            {
                                min: 9,
                                message: 'S??? ??i???n tho???i b???n v???a nh???p kh??ng ????ng ?????nh d???ng'

                            },
                            {
                                required: true,
                                pattern: new RegExp("^[0-9]*$"),
                                message: "S??? ??i???n tho???i ch??? bao g???m s???, kh??ng bao g???m k?? t??? kh??c!"
                            }
                        ]}
                    >
                        <Input disabled placeholder="Nh???p s??? ??i???n tho???i" addonBefore="+84" style={{ width: '100%' }} minLength="9" maxLength="10" />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="?????a Ch???"
                        name="diachi"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p ?????a ch???!',
                            },
                        ]}
                    >
                        <Input placeholder="T??a Nh??, T??n ???????ng..." />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="B???nh L??"
                        name="benhly"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p b???nh l??!',
                            },
                        ]}
                    >
                        <Input placeholder="Nh???p b???nh l?? c???a b???nh nh??n" />
                    </Form.Item>
                    <Form.Item
                        className="form-in"
                        label="Ghi Ch??"
                        name="ghichu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p ghi ch??!',
                            },
                        ]}
                    >
                        <Input placeholder="Nh???p ghi ch?? c???a b???nh nh??n" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">S???a Kh??ch H??ng</Button>
                    </Form.Item>
                </Form >
                <div style={{ marginBottom: '30px' }} class="ant-drawer-header">
                    <div class="ant-drawer-title">Ch???n D???ch V???</div>
                </div>
                <Select
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: '500px', marginBottom: '20px' }}
                    placeholder="Ch???n d???ch v???"
                    onChange={(value) => setIDDV(value)}
                >
                    {activeServicesList.map((item, index) => {
                        return <Select.Option key={index} value={item.id_dichvu}>{item.tendichvu}</Select.Option>
                    })}
                </Select>
                <br />
                <Button type="primary" onClick={createInvoice}>X??c Nh???n</Button>
            </Drawer>
        </>

    )
}
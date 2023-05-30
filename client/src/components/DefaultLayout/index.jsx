import { Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Popover, Tag, Button, Modal } from 'antd';
import MenuAdmin from '../MenuAdmin'
import logo from '../../imgs/logo.png'
import { ROUTERS } from '../../constants/router';
import React, { useEffect, useState } from 'react';
import { Badge } from 'antd';
import './styles.css'
import { GrNotification } from 'react-icons/gr'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";

//Components
import ResetPWD from '../resetPwdForm';
import { logoutAction } from '../../redux/actions';

const { Header, Content, Sider } = Layout;
function DefaultLayout(props) {
    const dispatch = useDispatch();
    const { defaultKey, openKey, exact, path, component: Component, ...other } = props;
    const getAdminContent = useSelector(state => state.statisticReducer);
    const { checkData } = getAdminContent;
    const [isCollapse, setIsCollapse] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    document.title = "Quản Lý | Thiện Hiếu"

    const getAdminInfo = useSelector((state) => state.accountReducer);
    const { email, isLogged } = getAdminInfo;
    // useEffect(() => {
    // dispatch(get30daysAction())
    //     if ((!check || !trangthai || !email) && user.token) dispatch(adminCheckAction(user.token))
    // }, []);

    // if (!isLogged || !email) {
    //     swal("Vui lòng đăng nhập", "", "error")
    //     return <Redirect to="/login" />
    // }
    function pushNotify() {
        return (
            <>
                {checkData.length > 0 ? (
                    checkData.map((item, index) => {
                        return (
                            <div key={index} style={{ borderBottom: "1px solid black", marginBottom: '20px' }}>Khách hàng <Tag color="gold">{item.hoten}</Tag>đã {Math.round(item.days)} ngày chưa tái khám</div>
                        )
                    })
                ) : (
                    <div>Không có thông báo</div>
                )}
            </>
        )
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => {
                return (
                    <>
                        <Layout>
                            <Header className="header" style={{ background: '#fff' }}>
                                <div style={{ float: 'left' }}>
                                    <Link to={ROUTERS.HOME}><img width='50px' height='50px' src={logo} alt="loading" /></Link>
                                </div>
                                <Menu mode="horizontal">
                                    {isCollapse ? <MenuUnfoldOutlined style={{ fontSize: '25px', marginLeft: '30px', top: '5px', position: 'relative' }} onClick={() => { setIsCollapse(false) }} /> : <MenuFoldOutlined style={{ fontSize: '25px', marginLeft: '30px', top: "5px", position: 'relative' }} onClick={() => { setIsCollapse(true) }} />}
                                    <Tag color="#ed9205" style={{ marginLeft: '50px' }}>{email}</Tag>

                                    <Popover placement="bottomRight" title={"Thông Báo"} content={pushNotify} trigger="click">
                                        <GrNotification style={{ marginLeft: '50px', fontSize: '25px', top: '8px', position: 'relative', cursor: 'pointer' }} />
                                        <Badge count={checkData.length}>
                                            <a href="#" className="head-example" />
                                        </Badge>
                                    </Popover>
                                    <Button style={{ marginLeft: '50px' }} onClick={() => { dispatch(logoutAction()) }} type="ghost">Đăng Xuất</Button>
                                    <Button style={{ marginLeft: '50px' }} onClick={() => setIsModalVisible(true)} type="ghost">Đổi Mật Khẩu</Button>
                                    <Modal title="Đổi Mật Khẩu" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                                        <ResetPWD setIsModalVisible={setIsModalVisible} />
                                    </Modal>
                                </Menu>

                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <Layout className="site-layout-background" style={{ padding: '24px 0' }} >
                                    <Sider trigger={null} collapsible collapsed={isCollapse} className="site-layout-background" width={230} style={{ background: '#fff' }}>
                                        <MenuAdmin defaultKey={defaultKey} openKey={openKey} />
                                    </Sider>
                                    <Content style={{ padding: '0 24px', minHeight: 280, background: '#f1f1f1', paddingRight: '0px' }}><Component {...other} {...routeProps} /></Content>
                                </Layout>
                            </Content>
                        </Layout>
                    </>
                )
            }}
        />
    );
}

export default DefaultLayout;

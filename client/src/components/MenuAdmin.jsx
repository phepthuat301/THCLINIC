import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../constants/router';
import { RiServiceFill, RiBillLine } from 'react-icons/ri';
import { FaUserAlt, FaHistory } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';

const { SubMenu } = Menu;
export default function MenuAdminVertical(props) {
    const { defaultKey, openKey } = props
    return (
        <Menu selectedKeys={[defaultKey]} mode="inline" defaultOpenKeys={[openKey]}>
            <SubMenu key="user" title="Quản Lý Khách Hàng" icon={<FaUserAlt/>}>
                <Menu.Item key="readuser"><Link to={ROUTERS.READ_USER}>Xem/Sửa Khách Hàng</Link></Menu.Item>
                <Menu.Item key="adduser"><Link to={ROUTERS.ADD_USER}>Thêm Khách Hàng</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sales" title="Quản Lý Dịch Vụ" icon={<RiServiceFill/>}>
                <Menu.Item key="readservices"><Link to={ROUTERS.READ_SERVICES}>Xem/Sửa Dịch Vụ</Link></Menu.Item>
                <Menu.Item key="addservices"><Link to={ROUTERS.ADD_SERVICES}>Thêm Dịch Vụ</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="readhistory" icon={<FaHistory/>} ><Link to={ROUTERS.READ_HISTORY}>Lịch Sử Khám Bệnh</Link></Menu.Item>
            <Menu.Item key="order" icon={<RiBillLine/>}><Link to={ROUTERS.READ_ORDER}> Quản Lý Hóa Đơn</Link></Menu.Item>
            <Menu.Item key="statistic" icon={<ImStatsBars/>}><Link to={ROUTERS.STATISTIC}> Quản Lý Thống Kê</Link></Menu.Item>
        </Menu>
    )
}
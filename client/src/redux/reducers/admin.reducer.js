import swal from 'sweetalert';
import history from '../../utils/history'
const initialState = {
    userList: [],
    userDetail: {},
    email: null,
    isLogged: false,
};
export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_USER_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'ADD_USER_SUCCESS':
            if (action.payload.data === "found") {
                swal("Khách hàng đã tồn tại", "Vui lòng kiểm tra trên hệ thống", "error")
            } else {
                swal("Thêm Thành Công", "", "success")
            }
            return {
                ...state,
                loading: false,
            };

        case "ADD_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_USER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_USER_SUCCESS":
            return {
                ...state,
                userList: action.payload,
                loading: false,
            };
        case "GET_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_USER_DETAIL":
            const newUserDetail = state.userList.filter(item => item.id_khachhang === parseInt(action.payload))
            return {
                ...state,
                userDetail: newUserDetail[0],
            };


        case "UPDATE_DIEUTRI_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_DIEUTRI_SUCCESS":
            const updateUser = state.userList
            for (let i = 0; i < updateUser.length; i++) {
                if (updateUser[i].id_khachhang === parseInt(action.payload.id_kh)) {
                    updateUser[i].diemtichluy = parseInt(action.payload.storageNum)
                }
                updateUser[i].historyList.forEach(item => {
                    if (item.id_donhang === parseInt(action.payload.id)) {
                        item.solandadieutri = parseInt(action.payload.num)
                        item.diemtichluy = parseInt(action.payload.storageNum)
                    }
                })
            }
            swal("Điểm Danh Thành Công", "", 'success')
            return {
                ...state,
                userList: updateUser,
                loading: false,
            };
        case "UPDATE_DIEUTRI_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_USER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_USER_SUCCESS":
            const updateUserInfo = state.userList
            updateUserInfo.forEach(item => {
                if (item.id_khachhang === parseInt(action.payload.id_khachhang)) {
                    item.hoten = action.payload.hoten;
                    item.diachi = action.payload.diachi;
                    item.benhly = action.payload.benhly;
                    item.ghichu = action.payload.ghichu;
                }
            })
            swal("Cập Nhật Thông Tin Thành Công", "", 'success')
            return {
                ...state,
                userList: updateUserInfo,
                loading: false,
            };
        case "UPDATE_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_INVOICE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'CREATE_INVOICE_SUCCESS':
            swal("Tạo hóa đơn thành công", "", "success")
            return {
                ...state,
                loading: false,
            };

        case "CREATE_INVOICE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "DELETE_USER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_USER_SUCCESS":
            if (action.payload.data === 'error') {
                swal("Xóa Khách Hàng Thất Bại", "khách hàng đã được thanh toán, vui lòng đổi trạng thái", "error");
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newUserList = state.userList.filter(item => item.id_khachhang !== action.payload.id)
                swal("Xóa Dịch Vụ Thành Công", "", "success");
                return {
                    ...state,
                    userList: newUserList,
                    loading: false,
                };
            }
        case "DELETE_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "LOGIN_SUCCESS":
            if (action.payload.data === 'fail') {
                swal("Sai Tài Khoản Hoặc Mật Khẩu", "", "error")
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newInfo = {
                    token: action.payload.data.token,
                }
                localStorage.setItem('user', JSON.stringify(newInfo));
                swal("Đăng nhập thành công!", {
                    buttons: {
                        dangnhap: {
                            text: "Trang Chủ",
                            value: true,
                        },
                    },
                })
                    .then((value) => {
                        switch (value) {

                            case "dangnhap":
                                history.push("/")
                                break;
                            default:
                                history.push("/")
                        }
                    });
                return {
                    ...state,
                    check: true,
                    email: action.payload.data.email,
                    trangthai: action.payload.data.trangthai,
                    loading: false,
                };
            }

        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "ADMIN_CHECK_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "ADMIN_CHECK_SUCCESS":
            let adminCheck
            let accountEmail
            let accountStatus
            if (action.payload.length > 0) {
                adminCheck = true;
                accountEmail = action.payload[0].email;
                accountStatus = action.payload[0].trangthai
            } else {
                adminCheck = false;
            }
            return {
                ...state,
                check: adminCheck,
                email: accountEmail,
                trangthai: accountStatus,
                loading: false,
            };
        case "ADMIN_CHECK_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'LOGOUT': {
            localStorage.setItem('user', JSON.stringify({}));
            history.push("/login")
            return {
                ...state,
            };
        }

        case "REMOVE_USER_ACTION":
            return {
                ...state,
                userList: [],
            };

        default: {
            return state;
        }
    }
}
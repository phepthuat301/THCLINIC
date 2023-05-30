import swal from "sweetalert";
import { deleteToken, persistToken } from "../../services/local-storage.service";
import history from "../../utils/history";

const initialState = {
    accountList: [],
    accountDetail: {},
    role: "",
    email: null,
    isLogged: false,
};
export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "LOGIN_SUCCESS":
            if (action.payload.data) {
                persistToken(action.payload.data.data);
                swal(action.payload.data.message, {
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
                    isLogged: true,
                    email: action.payload.email,
                    loading: false,
                };
            }

        case "LOGIN_FAIL":
            swal(action.payload, "", "error")
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'LOGOUT': {
            deleteToken();
            history.push("/login")
            return {
                ...state,
                isLogged: false,
                email: null
            };
        }

        case "GET_ACCOUNT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ACCOUNT_SUCCESS":
            return {
                ...state,
                accountList: action.payload,
                loading: false,
            };
        case "GET_ACCOUNT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "ADD_ACCOUNT_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'ADD_ACCOUNT_SUCCESS':
            if (action.payload.data === "found") {
                swal("Email hoặc tên tài khoản đã tồn tại", "Vui lòng kiểm tra trên hệ thống", "error")
            } else {
                swal("Thêm Thành Công", "", "success")
            }
            return {
                ...state,
                loading: false,
            };

        case "ADD_ACCOUNT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "RESET_PASSWORD_SUCCESS":
            swal("Reset Mật Khẩu Thành Công", "Mật khẩu sẽ là '1'", "success")
            return {
                ...state,
                loading: false,
            };

        case "EDIT_ACCOUNT_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'EDIT_ACCOUNT_SUCCESS':
            const newAccountList = state.accountList
            newAccountList.forEach(item => {
                if (item.id_qtv === parseInt(action.payload.id_qtv)) {
                    item.trangthai = action.payload.trangthai
                    item.role = action.payload.role
                }
            })
            return {
                ...state,
                accountList: newAccountList,
                loading: false,
            };

        case "EDIT_ACCOUNT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_ACCOUNT_DETAIL":
            const newAccountDetail = state.accountList.filter(item => item.id_qtv === parseInt(action.payload))
            return {
                ...state,
                accountDetail: newAccountDetail[0],
            };

        case "GET_ROLE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'GET_ROLE_SUCCESS':
            return {
                ...state,
                role: action.payload.data[0],
                loading: false,
            };

        case "GET_ROLE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_PASSWORD_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_PASSWORD_SUCCESS":
            if (action.payload.data) {
                swal("Bạn đã thay đổi mật khẩu thành công", "", "success")
            }
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_PASSWORD_FAIL":
            swal(action.payload, "", "error")
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "REMOVE_ACCOUNT_ACTION":
            return {
                ...state,
                accountList: [],
                accountDetail: {},
                role: "",
            };




        default: {
            return state;
        }
    }
}
import swal from "sweetalert";

const initialState = {
    accountList: [],
    accountDetail: {},
    role: "",
};
export default function accountReducer(state = initialState, action) {
    switch (action.type) {

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
            if (action.payload.data === false) {
                swal("Mật khẩu cũ không đúng", "vui lòng nhập lại", "warning")
            } else {
                swal("Bạn đã thay đổi mật khẩu thành công", "", "success")
            }
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_PASSWORD_FAIL":
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
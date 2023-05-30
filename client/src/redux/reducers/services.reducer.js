import swal from 'sweetalert';
const initialState = {
    servicesList: [],
    serviceDetail: {},
    serviceHistory: [],
    activeServicesList: [],
    orderList: [],
};
export default function servicesReducer(state = initialState, action) {
    switch (action.type) {

        case "ADD_SERVICES_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'ADD_SERVICES_SUCCESS':
            if (action.payload.data === "found") {
                swal("Dịch Vụ Đã Tồn Tại", "Vui lòng kiểm tra trên hệ thống", "error")
            } else {
                swal("Thêm Thành Công", "", "success")
            }
            return {
                ...state,
                loading: false,
            };

        case "ADD_SERVICES_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_SERVICES_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'GET_SERVICES_SUCCESS':
            return {
                ...state,
                servicesList: action.payload,
                loading: false,
            };

        case "GET_SERVICES_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_SERVICES_DETAIL":
            const newServicesDetail = state.servicesList.filter(item => item.id_dichvu === parseInt(action.payload))
            return {
                ...state,
                serviceDetail: newServicesDetail[0],
            };


        case "GET_SERVICES_HISTORY_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'GET_SERVICES_HISTORY_SUCCESS':
            return {
                ...state,
                serviceHistory: action.payload,
                loading: false,
            };

        case "GET_SERVICES_HISTORY_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_SERVICES_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'UPDATE_SERVICES_SUCCESS':
            const newServicesList = state.servicesList
            newServicesList.forEach(item => {
                if (item.id_dichvu === parseInt(action.payload.id_dichvu)) {
                    item.trangthai = action.payload.trangthai
                }
            })
            return {
                ...state,
                servicesList: newServicesList,
                loading: false,
            };

        case "UPDATE_SERVICES_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_ACTIVE_SERVICES_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'GET_ACTIVE_SERVICES_SUCCESS':
            return {
                ...state,
                activeServicesList: action.payload.data.data,
                loading: false,
            };

        case "GET_ACTIVE_SERVICES_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "DELETE_SERVICE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_SERVICE_SUCCESS":
            if (action.payload.data === 'error') {
                swal("Xóa Dịch Vụ Thất Bại", "dịch vụ đã được sử dụng, vui lòng chuyển trạng thái dịch vụ", "error");
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newServiceList = state.servicesList.filter(item => item.id_dichvu !== action.payload.id)
                swal("Xóa Dịch Vụ Thành Công", "", "success");
                return {
                    ...state,
                    servicesList: newServiceList,
                    loading: false,
                };
            }
        case "DELETE_SERVICE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "GET_ORDER_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case 'GET_ORDER_SUCCESS':
            return {
                ...state,
                orderList: action.payload,
                loading: false,
            };

        case "GET_ORDER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "REMOVE_SERVICES_ACTION":
            return {
                ...state,
                servicesList: [],
                activeServicesList: [],
                serviceHistory: [],
                orderList: [],
            };



        default: {
            return state;
        }
    }
}
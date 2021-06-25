import swal from 'sweetalert';
const initialState = {
    revenueData: [],
    orderTotalData: [],
    dayRevenueData: [],
    dayOrderTotalData: [],
    totalRevenue: [],
    userInMonth: [],
    checkData: [],
};
export default function statisticReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_REVENUE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_REVENUE_SUCCESS":
            return {
                ...state,
                revenueData: action.payload,
                loading: false,
            };
        case "GET_REVENUE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_ORDER_TOTAL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ORDER_TOTAL_SUCCESS":
            return {
                ...state,
                orderTotalData: action.payload,
                loading: false,
            };
        case "GET_ORDER_TOTAL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_DAY_REVENUE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DAY_REVENUE_SUCCESS":
            return {
                ...state,
                dayRevenueData: action.payload,
                loading: false,
            };
        case "GET_DAY_REVENUE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_DAY_ORDER_TOTAL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DAY_ORDER_TOTAL_SUCCESS":
            return {
                ...state,
                dayOrderTotalData: action.payload,
                loading: false,
            };
        case "GET_DAY_ORDER_TOTAL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_TOTAL_REVENUE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_TOTAL_REVENUE_SUCCESS":
            return {
                ...state,
                totalRevenue: action.payload[0],
                loading: false,
            };
        case "GET_TOTAL_REVENUE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_USER_IN_MONTH_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_USER_IN_MONTH_SUCCESS":
            return {
                ...state,
                userInMonth: action.payload,
                loading: false,
            };
        case "GET_USER_IN_MONTH_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_30_DAYS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_30_DAYS_SUCCESS":
            const newArr = [];
            action.payload.forEach(item => {
                let d = new Date(item.ngaytaikham)
                let today = new Date();
                if ((today.getTime() - d.getTime()) > 2592000000) {
                    newArr.push({
                        ...item,
                        days: (today.getTime() - d.getTime()) / (86400000)
                    })
                }
            })
            return {
                ...state,
                checkData: newArr,
                loading: false,
            };
        case "GET_30_DAYS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default: {
            return state;
        }
    }
}
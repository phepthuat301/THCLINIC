import axios from 'axios'
import { httpDelete, httpPost } from '../../services/http.service';
import { apiUrlV1, itemStatusEnum } from '../../utils/constant';

export const addServicesAction = (params) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_SERVICES_REQUEST" });
        const data = await httpPost(apiUrlV1.addItem, {
            name: params.name,
            price: params.price,
            reward_point: params.reward_point,
            number_of_treatments: params.number_of_treatments,
            payment_method: params.payment_method,
            code: params.code,
        })
        dispatch({
            type: "ADD_SERVICES_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "ADD_SERVICES_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getServicesAction = (keyword, page, limit) => async (dispatch) => {
    try {
        dispatch({ type: "GET_SERVICES_REQUEST" });

        const { data } = await httpPost(apiUrlV1.getListItem, {
            keyword: keyword ?? '',
            page,
            limit
        })

        dispatch({
            type: "GET_SERVICES_SUCCESS",
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: "GET_SERVICES_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getActiveServicesAction = (keyword, page, limit) => async (dispatch) => {
    try {
        dispatch({ type: "GET_ACTIVE_SERVICES_REQUEST" });

        const data = await httpPost(apiUrlV1.getListItem, { keyword: keyword ?? '', page, limit });
        const filterData = data.data.data.filter(item => item.status === itemStatusEnum.ACTIVE);
        dispatch({
            type: "GET_ACTIVE_SERVICES_SUCCESS",
            payload: filterData,
        });
    } catch (error) {
        dispatch({
            type: "GET_ACTIVE_SERVICES_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getServicesHistoryAction = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_SERVICES_HISTORY_REQUEST" });

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/serviceshistory`);

        dispatch({
            type: "GET_SERVICES_HISTORY_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "GET_SERVICES_HISTORY_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateServicesAction = (params) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_SERVICES_REQUEST" });
        await httpPost(apiUrlV1.updateItem, {
            id: params.id,
            name: params.name,
            status: params.status,
            price: params.price,
            reward_point: params.reward_point,
            number_of_treatments: params.number_of_treatments
        })
        dispatch({
            type: "UPDATE_SERVICES_SUCCESS",
            payload: params,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_SERVICES_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteServiceAction = (id) => async (dispatch) => {
    try {
        console.log(id)
        dispatch({ type: "DELETE_SERVICE_REQUEST" });
        const { data } = await httpDelete(`${apiUrlV1.deleteItem}/${id}`)
        const newData = {
            data: data,
            id: id,
        }
        dispatch({
            type: "DELETE_SERVICE_SUCCESS",
            payload: newData,
        });
    } catch (error) {
        dispatch({
            type: "DELETE_SERVICE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const getOrderAction = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_ORDER_REQUEST" });

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/order`);

        dispatch({
            type: "GET_ORDER_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "GET_ORDER_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getServicesDetailAction = (id) => {
    return {
        type: 'GET_SERVICES_DETAIL',
        payload: id,
    }
}

export const removeServicesAction = () => {
    return {
        type: 'REMOVE_SERVICES_ACTION',
    }
}
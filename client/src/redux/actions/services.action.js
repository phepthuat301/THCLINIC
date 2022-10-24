import axios from 'axios'

export const addServicesAction = (params) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_SERVICES_REQUEST" });
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/addservices`, {
            tendv: params.tendv,
            giadv: params.giadv,
            madv: params.madv,
            solandieutri: params.solandieutri,
            trangthai: params.trangthai,
            giatichluy: params.giatichluy,
        });
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


export const getServicesAction = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_SERVICES_REQUEST" });

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/services`);

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

export const getActiveServicesAction = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_ACTIVE_SERVICES_REQUEST" });

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/activeservices`);

        dispatch({
            type: "GET_ACTIVE_SERVICES_SUCCESS",
            payload: data,
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
        await axios.put(`${process.env.REACT_APP_API_URL}/updateservices`, {
            id_dichvu: params.id_dichvu,
            trangthai: params.trangthai,
        });
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
        dispatch({ type: "DELETE_SERVICE_REQUEST" });
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteservice/${id}`);
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
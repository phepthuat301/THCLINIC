import axios from 'axios'
import { httpPost } from '../../services/http.service';
import { apiUrlV1 } from '../../utils/constant';
const md5 = require('md5');

export const getAccountAction = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_ACCOUNT_REQUEST" });
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/account`);
        dispatch({
            type: "GET_ACCOUNT_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "GET_ACCOUNT_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addAccountAction = (params) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_ACCOUNT_REQUEST" });
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/addaccount`, {
            username: params.username,
            email: params.email,
            role: params.role,
            trangthai: params.trangthai
        });
        dispatch({
            type: "ADD_ACCOUNT_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "ADD_ACCOUNT_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetPasswordAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: "RESET_PASSWORD_REQUEST" });
        await axios.put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
            id_user: id,
        });
        dispatch({
            type: "RESET_PASSWORD_SUCCESS",
        });
    } catch (error) {
        dispatch({
            type: "RESET_PASSWORD_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editAccountAction = (params) => async (dispatch) => {
    try {
        dispatch({ type: "EDIT_ACCOUNT_REQUEST" });
        await axios.put(`${process.env.REACT_APP_API_URL}/editaccount`, {
            id_qtv: params.id_qtv,
            trangthai: params.trangthai,
            role: params.role,
        });
        dispatch({
            type: "EDIT_ACCOUNT_SUCCESS",
            payload: params,
        });
    } catch (error) {
        dispatch({
            type: "EDIT_ACCOUNT_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAccountDetailAction = (id) => {
    return {
        type: 'GET_ACCOUNT_DETAIL',
        payload: id,
    }
}

export const getRoleAction = () => async (dispatch) => {
    const account = JSON.parse(localStorage.getItem('user')) || {};
    try {
        dispatch({ type: "GET_ROLE_REQUEST" });
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/getrole`, {
            token: account.token,
        });
        dispatch({
            type: "GET_ROLE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "GET_ROLE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updatePasswordAction = (oldPass, newPass) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PASSWORD_REQUEST" });
        const data = await httpPost(apiUrlV1.changePassword, { password: oldPass, passwordNew: newPass })
        dispatch({
            type: "UPDATE_PASSWORD_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_PASSWORD_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const removeAccountAction = () => {
    return {
        type: 'REMOVE_ACCOUNT_ACTION',
    }
}

export const loginAction = (params) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });
        const data = await httpPost(apiUrlV1.login, { email: params.email, password: params.password })
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: { ...data, email: params.email },
        });
    } catch (error) {
        dispatch({
            type: "LOGIN_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logoutAction = () => {
    return {
        type: 'LOGOUT',
    }
}
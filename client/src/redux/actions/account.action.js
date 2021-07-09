import axios from 'axios'
const md5 = require('md5');

export const getAccountAction = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_ACCOUNT_REQUEST" });
        const { data } = await axios.get("http://localhost:3001/account");
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
        const data = await axios.post("http://localhost:3001/addaccount", {
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
        await axios.put(`http://localhost:3001/resetpassword`, {
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
        await axios.put("http://localhost:3001/editaccount", {
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
        const data = await axios.post("http://localhost:3001/getrole", {
            token : account.token,
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

export const updatePasswordAction = (oldPass, newPass, email) => async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_PASSWORD_REQUEST" });
      const data = await axios.put("http://localhost:3001/updatepassword", {
        oldPass: md5(oldPass),
        newPass: md5(newPass),
        email,
      });
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
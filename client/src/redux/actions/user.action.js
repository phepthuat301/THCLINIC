import axios from 'axios'
const md5 = require('md5');
const crypto = require('crypto')
export const addUserAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_USER_REQUEST" });
    const data = await axios.post("http://14.236.55.118:3001/adduser", {
      hoten: params.hoten,
      diachi: params.diachi,
      sodienthoai: params.sodienthoai,
      benhly: params.benhly,
      ghichu: params.ghichu,
      id_nguoigioithieu: params.id_nguoigioithieu,
    });
    dispatch({
      type: "ADD_USER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_REQUEST" });
    const { data } = await axios.get("http://14.236.55.118:3001/user");
    dispatch({
      type: "GET_USER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetailAction = (id) => {
  return {
    type: 'GET_USER_DETAIL',
    payload: id,
  }
}

export const updateDieutriAction = (id, num, id_kh, storageNum) => async (dispatch) => {
  const data = { id, num, id_kh, storageNum }
  try {
    dispatch({ type: "UPDATE_DIEUTRI_REQUEST" });
    await axios.put("http://14.236.55.118:3001/updatedieutri", {
      id,
      num,
      id_kh,
      storageNum,
    });
    dispatch({
      type: "UPDATE_DIEUTRI_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_DIEUTRI_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });
    await axios.put("http://14.236.55.118:3001/updateuser", {
      id_khachhang: params.id_khachhang,
      hoten: params.hoten,
      diachi: params.diachi,
      benhly: params.benhly,
      ghichu: params.ghichu,
    });
    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: params,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createInvoiceAction = (IDKH,IDDV,diemtichluy) => async (dispatch) => {
  try {
      dispatch({ type: "CREATE_INVOICE_REQUEST" });
      await axios.post("http://14.236.55.118:3001/createinvoice", {
          IDKH,
          IDDV,
          diemtichluy,
      });
      dispatch(getUserAction())
      dispatch({
          type: "CREATE_INVOICE_SUCCESS",
      });
  } catch (error) {
      dispatch({
          type: "CREATE_INVOICE_FAIL",
          payload:
              error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
      });
  }
};


export const deleteUserAction = (id) => async (dispatch) => {
  try {
      dispatch({ type: "DELETE_USER_REQUEST" });
      const { data } = await axios.delete(`http://14.236.55.118:3001/deleteuser/${id}`);
      const newData = {
          data: data,
          id: id,
      }
      dispatch({
          type: "DELETE_USER_SUCCESS",
          payload: newData,
      });
  } catch (error) {
      dispatch({
          type: "DELETE_USER_FAIL",
          payload:
              error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
      });
  }
}

export const loginAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const data = await axios.post(`http://14.236.55.118:3001/login`, {
      password: md5(params.password),
      username: params.username,
      token: crypto.randomBytes(20).toString('hex')
    });
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
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

export const adminCheckAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_CHECK_REQUEST" });
    const { data } = await axios.get(`http://14.236.55.118:3001/admincheck/${id}`);
    console.log("1"+data)
    dispatch({
      type: "ADMIN_CHECK_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADMIN_CHECK_FAIL",
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

export const removeUserAction = () => {
  return {
    type: 'REMOVE_USER_ACTION',
  }
}


import axios from 'axios'
import { httpGet, httpPost } from '../../services/http.service';
import { apiUrlV1 } from '../../utils/constant';

export const addUserAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_USER_REQUEST" });
    const data = await httpPost(apiUrlV1.addUser, {
      name: params.name,
      date_of_birth: params.date_of_birth,
      address: params.address,
      note: params.note,
      gender: params.gender,
      pathological: params.pathological,
      phone: params.phone,
      referral_code: params.referral_code,
    })
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

export const getUserAction = (keyword, page, limit) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_REQUEST" });
    const data = await httpPost(apiUrlV1.getListUser, { keyword: keyword ?? "", page, limit })
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
    await axios.put(`${process.env.REACT_APP_API_URL}/updatedieutri`, {
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
    await axios.put(`${process.env.REACT_APP_API_URL}/updateuser`, {
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

export const createInvoiceAction = (IDKH, IDDV, diemtichluy) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_INVOICE_REQUEST" });
    await axios.post(`${process.env.REACT_APP_API_URL}/createinvoice`, {
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
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteuser/${id}`);
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

export const adminCheckAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_CHECK_REQUEST" });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/admincheck/${id}`);
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

export const removeUserAction = () => {
  return {
    type: 'REMOVE_USER_ACTION',
  }
}


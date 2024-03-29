import axios from "axios";
export const getRevenueAction = (year) => async (dispatch) => {
  try {
    dispatch({ type: "GET_REVENUE_REQUEST" });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doanhthu/${year}`);
    dispatch({
      type: "GET_REVENUE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_REVENUE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderTotalAction = (year) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ORDER_TOTAL_REQUEST" });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tongsoluong/${year}`);
    dispatch({
      type: "GET_ORDER_TOTAL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ORDER_TOTAL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDayRevenueAction = (month, year) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DAY_REVENUE_REQUEST" });
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/doanhthungay`, {
      month,
      year,
    });
    dispatch({
      type: "GET_DAY_REVENUE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_DAY_REVENUE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDayOrderTotalAction = (month, year) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DAY_ORDER_TOTAL_REQUEST" });
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/tongsoluongngay`, {
      month,
      year,
    });
    dispatch({
      type: "GET_DAY_ORDER_TOTAL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_DAY_ORDER_TOTAL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTotalRevenueAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_TOTAL_REVENUE_REQUEST" });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tongdoanhthu`);
    dispatch({
      type: "GET_TOTAL_REVENUE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_TOTAL_REVENUE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserInMonthAction = (year) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_IN_MONTH_REQUEST" });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/userinmonth/${year}`);
    dispatch({
      type: "GET_USER_IN_MONTH_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_IN_MONTH_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const get30daysAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_30_DAYS_REQUEST" });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/30days`);
    dispatch({
      type: "GET_30_DAYS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_30_DAYS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
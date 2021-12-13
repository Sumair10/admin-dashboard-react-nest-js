import { actionTypes, apiCreator, actionCreator } from '../common';
import * as utils from '../../common/utils';

export const addDriver = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("addDriver action request body",body)
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: '/driver', body: body },
      actionTypes.ADD_DRIVER,
      dispatch
    );
    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  console.log("addDriver action response",response)
  return response;
};

export const addMultipleDrivers = (body) => async (dispatch) => {
  console.log("body",body)
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "/driver/multiple", body: body },
      actionTypes.ADD_MULTIPLE_DRIVERS,
      dispatch
    );
    console.log("response",response)
  }
  catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const fetchDrivers = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: '/driver/all', body: body },
      actionTypes.FETCH_ALL_DRIVERS,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const fetchUnassignedDrivers = (body) => async (dispatch) => {
  console.log("inside fetch unassign drivers request",body)
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: '/driver/unassigned', body: body },
      actionTypes.FETCH_UNASSIGNED_DRIVERS,
      dispatch
    );
    console.log("fetch unassign drivers response",response)
    // addDrivers();
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const fetchDriverHistory = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: '/driver/history', body: body },
      actionTypes.FETCH_DRIVER_HISTORY,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const deleteDriver = (body, remove) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'DELETE', endPoint: '/driver', body: body },
      actionTypes.DELETE_DRIVER,
      dispatch
    );
    remove();
  } catch (err) {
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const editDriver = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'PATCH', endPoint: '/driver', body: body },
      actionTypes.EDIT_DRIVER,
      dispatch
    );
    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

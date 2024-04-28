
const constants = require("../utility/constants");

exports.sendResponse = (res, msg, status, data, values) => {
  const response = {
    message: msg,
    status: status,
    data: data || {}
  };
  if (values) {
    response.values = values;
  }
  res.send(JSON.stringify(response));
}

exports.actionCompleteResponse = (res, data) => {
  const response = {
    message: constants.responseMessages.ACTION_COMPLETE,
    status: 200,
    data: data || {}
  };
  res.send(JSON.stringify(response));
}

exports.sendError = (res, flag, message, data) => {
  const response = {
    message: message || constants.responseMessages.ERROR_IN_EXECUTION,
    status: flag || constants.responseFlags.ERROR_IN_EXECUTION,
    data: data || {}
  };
  res.send(JSON.stringify(response));
}
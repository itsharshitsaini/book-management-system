

exports.sendResponse = (res, msg, status, data, values) => {
    const response = {
      message: msg,
      status : status,
      data   : data || {}
    };
    if(values){
      response.values = values;
    }
    res.send(JSON.stringify(response));
}

exports.sendActionCompleteResponse = (res, data) => {
    const response = {
        message: 'ACTION_COMPLETE',
        status: 200,
        data: data || {}
    };
    res.send(JSON.stringify(response));
}
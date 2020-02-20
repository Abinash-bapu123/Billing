const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
});

function showResultMessage(type, message) {
    Toast.fire({
        type: type,
        title: message
    });
}

function genApiReq(obj, reqhelper) {
    var queryString = {};
    $.each($(obj).serializeArray(), function(i, field) {
        queryString[field.name] = field.value;
    });
    // console.log(queryString);
    var apiReq ={
        url: reqhelper.url,
        method: reqhelper.method,
        data: queryString,
        apiName: reqhelper.apiname,
        file: 'session.json'
    };
    apiManager(apiReq);
}

function createSession(file, resData) {
    fs.writeFile(file, resData, (err) => {
        if (err){console.log(err)}
    });
    ipc.send('login_success', file);
}

function loadSession(file) {
    fs.readFile(file, function (err, data) {
      if (err) {
        return console.error(err);
      }
      var sesDetails = JSON.parse(data);
      $('.login-box-msg').text(sesDetails.username);
    });
}

function checkApiType(apiName, file, resData) {
    if (apiName == 'login') {
        createSession(file, resData);
    }
}
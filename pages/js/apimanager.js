
let path = 'local_storage/'
var filename = '';

function apiManager(apiReq) {
    filename = apiReq.file
    fetch(apiReq.url, {
        method: apiReq.method,
        body: JSON.stringify(apiReq.data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => {
            if (json.status) {
                var resData = JSON.stringify(json.data);
                checkApiType(apiReq.apiName, path + filename, resData);
                showResultMessage('success', json.message);
            }
            else {
                showResultMessage('error', json.message);
            }
        });
}
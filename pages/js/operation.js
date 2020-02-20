const electron = require('electron');
const ipc = electron.ipcRenderer;
var fs = require('fs');

const apiUrl = 'http://localhost/test/';
// const apiUrl = 'http://localhost/test/';

function login(e,obj) {
    e.preventDefault();
    var api = 'login';
    var reqhelper = {
        url : apiUrl + api,
        apiname : api,
        file : 'session.json',
        method : 'POST' 
    }
    genApiReq(obj, reqhelper);
}

// $(document).ready(function(){
//     alert('hi');
// });
let http = require("http");
let fs = require("fs");
const qs = require("querystring");
let MyEventEmitter = require("./MyEventEmitter.js");
let AllNewsUsers = require("./AllNewsUsers.js");
let User = require("./User.js");
let News = require("./News.js")
let SendResponse = require("./SendResponse.js");

let ee = new MyEventEmitter();
let allNU = new AllNewsUsers(ee);
let sendResponse = new SendResponse();

let alex = allNU.createUser("alex");
let den = allNU.createUser("den");
let sam = allNU.createUser("sam");

allNU.createNews("sport"); //0
allNU.createNews("it");    //1
allNU.createNews("fishin");//2

allNU.subscribeUser(0, alex.id);
allNU.subscribeUser(1, den.id);
allNU.subscribeUser(2, sam.id);
allNU.subscribeUser(1, sam.id);

allNU.createNews("sport");
allNU.createNews("fishin");
allNU.createNews("it");

allNU.createNews("sport");
allNU.createNews("it");

let newsId = 0;
let userId = 0;
let result = "";
let reqUr = "";

http.createServer((request, response) => {
    reqUrl = request.url;
    let stringArr = request.url.split("/");
    stringArr.splice(0, 1);

    if (stringArr[0] == "news") {
        if (stringArr.length == 4) {
            newsId = Number(stringArr[1]);
            userId = Number(stringArr[3]);
        } else if (stringArr.length == 2) {
            newsId = Number(stringArr[1]);
        }
    } else if (stringArr[0] == "user") {
        userId = Number(stringArr[1]);
    }

    switch (reqUrl) {
        case `/news/${newsId}/subscribe/${userId}`:
            result = allNU.subscribeUser(newsId, userId);
            sendResponse.okNotFound(result, response);
            break;
        case `/news/${newsId}/unsubscribe/${userId}`:
            result = allNU.unsubscribeUser(newsId, userId);
            sendResponse.okNotFound(result, response);
            break;
        case `/user/${userId}/subscriptions`:
            result = allNU.getSubsriptions(userId);
            sendResponse.sendJSONNotF(result, response);
            break;
        case `/user/${userId}/export`:
            let time = new Date();
            let nameFile = `user_${userId}_${time.getHours()}-${time.getMinutes()}.json`
            allNU.exportUser(userId, nameFile, response).then((file) => {
                response.writeHead(200, { "Content-Disposition": `attachment; filename = ${nameFile}` });
                response.write(file);
                response.end();
            });
            break;
        case `/user/${userId}`:
            result = allNU.getUser(userId);
            sendResponse.sendJSONNotF(result, response);
            break;
        case `/news/${newsId}`:
            result = allNU.getNews(newsId);
            sendResponse.sendJSONNotF(result, response);
            break;
        case `/`:
            sendResponse.notFound("Not found", response);
    }

}).listen(3000, () => console.log("Server is working"));





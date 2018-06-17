let http = require("http");
let fs = require("fs");
const qs = require("querystring");
let MyEventEmitter = require("./MyEventEmitter.js");
let AllNewsUsers = require("./AllNewsUsers.js");

let ee = new MyEventEmitter();
let allNU = new AllNewsUsers(ee);

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

allNU.unsubscribeUser(0, alex.id);
allNU.unsubscribeUser(1, sam.id);

allNU.createNews("sport");
allNU.createNews("it");

console.log(allNU.getUser(alex.id));
console.log(allNU.getSubsriptions(alex.id));
console.log(allNU.getNews(0));



http.createServer((request, response) => {


    console.log(request.url);
    console.log(request.method);
    let newsId = 0;
    let userId = 0;
    let stringArr = request.url.split("/").splice(0, 1);
    console.log(stringArr);
    
    let reqUrl = request.url;

    if(stringArr[0]=="news"){
        if(stringArr.length == 4){
            newsId = Number(stringArr[1]);
            userId = Number(stringArr[3]);
        } else if(stringArr.length == 2){
            newsId = Number(stringArr[1]);
        }
    }else if(stringArr[0]=="user"){
        userId = Number(stringArr[1]);
    }

    response.write("<html><body><div>");

    switch (reqUrl) {
        case `/news/${newsId}/subscribe/${userId}`:
            {
                allNU.subscribeUser(newsId, userId);
                response.write(`User with id ${userId} subscribes to news with id ${newsId}`);
            }
            break;
        case `/news/${newsId}/unsubscribe/${userId}`:
            {
                allNU.unsubscribeUser(newsId, userId);
                response.write(`User with id ${userId} unsubscribes from news with id ${newsId}`);
            }
            break;
        case `/user/${userId}/subscriptions`:
            response.write(JSON.stringify(allNU.getSubsriptions(userId), "", 2));
            break;
        case `/user/${userId}/export`:
            {
                allNU.exportUser(userId);
                response.write(`Data of user ${userId} write to file`);
            }
            break;
        case `/user/${userId}`:
            response.write(JSON.stringify(allNU.getUser(userId), "", 2));
            break;
        case `/news/${newsId}`:
            response.write(JSON.stringify(allNU.getNews(newsId), "", 2));
            break;
        default:
            {
                response.write("</div></body></html>");
            }
    }
    response.end();
}).listen(3000, () => console.log("Server is working"));

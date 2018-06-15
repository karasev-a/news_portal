let http = require("http");
let fs = require("fs");
const qs = require("querystring");
// let User = require("./user.js");
// let News = require("./news.js");
let EventEmitter = require("./event_emitter.js");
let AllNewsUsers = require("./all_news_users.js");


let ee = new EventEmitter();
let allNU = new AllNewsUsers(ee);

let alex  = allNU.createUser("alex");
let den  = allNU.createUser("den");
let sam  = allNU.createUser("sam");


allNU.createNews("sport"); //0
allNU.createNews("it");    //1
allNU.createNews("fishin");//2

allNU.subscribeUser(0, alex.id);
allNU.subscribeUser(2, alex.id);
allNU.subscribeUser(1, den.id);
allNU.subscribeUser(2, sam.id);
allNU.subscribeUser(1, sam.id);

allNU.createNews("sport");
allNU.createNews("fishin");
allNU.createNews("it");

allNU.unsubscribeUser(2, alex.id);
allNU.unsubscribeUser(1, sam.id);

allNU.createNews("sport");
allNU.createNews("it");

console.log(allNU.getUser(alex.id));
console.log(allNU.getSubsriptions(alex.id));
console.log(allNU.getNews(0));












// http.createServer((request, response) => {

//     if (request.method === "GET" && request.url === "/") {
//         console.log(request.url);
//         console.log(request.method);
//         response.end(htmlCash);
//     } else if (request.method === "POST") {
//         console.log(request.url);
//         console.log(request.method);

//         let body = [];

//         request.on('data', (chunk) => {
//             body.push(chunk);
//         }).on('end', () => {
//             body = Buffer.concat(body).toString();
//             let formData = qs.parse(body.toString());

//             fs.readFile("dataOfForm.json", 'utf8', (err, data) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     let oldJsonFileObj = JSON.parse(data);
//                     oldJsonFileObj.push(formData);
//                     json = JSON.stringify(oldJsonFileObj);
//                     fs.writeFile("dataOfForm.json", json, 'utf8', (err) => {
//                         if (err) {
//                             throw err;
//                         } else {
//                             console.log("The data of form was append to json file");
//                         }
//                     });
//                 }
//             });
//         });
//         response.end(htmlCash);
//     }
// }).listen(3000, () => console.log("Server is working"));

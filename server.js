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
let sam  = allNU.createUser("sem");


allNU.subscribeUser("sport", alex.id);
ee.subscribe("it", den.getNews);
ee.subscribe("fishin", sam.getNews);
//allNU.subscribeUser("fishin", alex.id);


allNU.createNews("sport");
allNU.createNews("sport");
allNU.createNews("it");
allNU.createNews("garden");
//ee.unsubscribe("sport", alex.getNews);
allNU.createNews("sport");
allNU.createNews("fishin");

console.log("All articte of alex - " + alex.articles);
console.log("All articte of den - " + den.articles);
console.log("All articte of sam - " + sam.articles);



//console.log(alex.subscriptions);
//console.log(ee.subscribers);

console.log(allNU.getUser(2));
console.log(allNU.getNews(0));
//console.log(allNU.getSubsriptions(alex.id));

//console.log(alex.subscriptions);






//console.log(allNU.allNews);








// let alex = new User(0, "alex");
// let den = new User(1, "den");
// let sam = new User(2, "sam");

// let ee = new EventEmitter();

// let allNews = new AllNew(ee)
// ee.subscribe("sport", alex.getNews);
// ee.subscribe("sport", den.getNews);
// ee.subscribe("it", sam.getNews);
// ee.subscribe("sport", sam.getNews);
// ee.subscribe("fishin", alex.getNews);

// allNews.createNews("sport");
// allNews.createNews("it");
// allNews.createNews("fishin");

// ee.unsubscribe("it", sam.getNews);

// allNews.createNews("sad");
// allNews.createNews("fishin");
// allNews.createNews("sport");

// allNews.createNews("it");


// console.log("---------");

// console.log("All News" + allNews);

// console.log("---------");

// console.log("All articte of alex - " + alex.articles);
// console.log("All articte of den - " + den.articles);
// console.log("All articte of sam - " + sam.articles);

// console.log(alex.articles.forEach(article =>{
//     console.log(article);
    
// }));











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

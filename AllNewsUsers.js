let fs = require("fs");
let News = require("./News.js");
let User = require("./User.js");
let http = require("http");

class AllNewsUsers {
    constructor(eventEmitter) {
        this._allNews = [];
        this._allUsers = [];
        this._eventEmitter = eventEmitter;
        this._counterNews = 0;
    }

    readFileProm(path, coding) {
        return new Promise((res, rej) => {
            fs.readFile(path, coding, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            })
        })
    }

    writeFileProm(path, data, coding) {
        return new Promise((res, rej) => {
            fs.writeFile(path, data, coding, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            })
        })
    }

    get allNews() {
        return this._allNews;
    }
    get allUsers() {
        return this._allUsers;
    }
    get eventEmitter() {
        return this._eventEmitter;
    }

    createNews(titleNews) {
        let flagTitleNews = false;
        this._allNews.some(oneNews => {
            if (oneNews.title == titleNews) {
                let article = oneNews.addArticle();
                article.newsId = oneNews.id;
                this._eventEmitter.publish(oneNews.title, article);
                flagTitleNews = true;
                return true;
            }
        })
        if (flagTitleNews == false) {
            let idTitleNews = this._allNews.length;
            let oneNews = new News(idTitleNews, titleNews);
            let article = oneNews.addArticle();
            article.newsId = oneNews.id;
            this._allNews.push(oneNews);
            this._eventEmitter.publish(oneNews.title, article);
        }
    }

    createUser(name) {
        let user = {};
        if (this._allUsers.length == 0) {
            user = new User(0, name);
            this._allUsers.push(user);
        } else {
            user = new User(this._allUsers.length, name);
            this._allUsers.push(user);
        }

        return user;
    }

    subscribeUser(newsIdPar, idUser) {
        let res = "";
        if (this._allUsers[idUser]) {
            const news = this._allNews.find(el => { if (el.id === newsIdPar) { return true; } })
            if (news !== undefined) {
                res = this._allUsers[idUser];
                this._eventEmitter.subscribe(news.title, res.getNews)
                let newsId = news.id;
                let titleNews = news.title;
                let subscription = { newsId, titleNews }
                this._allUsers[idUser].subscriptions.push(subscription)
            } else {
                res = `There is not news with id ${newsIdPar}`
                console.log(res);
            }
        } else {
            res = `Not found User with id ${idUser}`
            console.log(res);
        }
        return res;
    }

    unsubscribeUser(newsIdPar, idUser) {
        let res = "";
        if (this._allUsers[idUser]) {

            res = this._allUsers[idUser];
            const news = this._allNews.find(el => { if (el.id === newsIdPar) { return true; } })
            this._eventEmitter.unsubscribe(news.title, res.getNews)
            const a = this._allUsers[idUser].subscriptions.find(el => {
                if (el.newsId === news.id) {
                    return true;
                }
            })

            let indexSub = this._allUsers[idUser].subscriptions.indexOf(a);
            if (indexSub >= 0) {
                this._allUsers[idUser].subscriptions.splice(indexSub, 1);
            }
        } else {
            res = `Not found User with id ${idUser}`
            console.log(res);
        }
        return res;
    }

    getUser(idUser) {
        let res = "";
        if (this._allUsers[idUser]) {
            res = this._allUsers[idUser];
        } else {
            res = `Not found User with id ${idUser}`
        }
        return res;
    }

    getSubsriptions(idUser) {
        let user = this.getUser(idUser);
        let subscription = []
        return user.subscriptions;
    }

    exportUser(idUser, response) {
        let user = this.getUser(idUser);
        let json = JSON.stringify(user, "", 2);
        let time = new Date();
        let path = `user_${idUser}_${time.getHours()}_${time.getMinutes()}.json`;

        //fs.writeFile(, json, 'utf8', (err) => {
        return this.writeFileProm(path, json, "utf8").
        then((user)=>{
           return  this.readFileProm(path, user, "utf8");
        });
    }


    getNews(idNews) {
        let res = "";
        if (this._allNews[idNews]) {
            res = this._allNews[idNews];
        } else {
            res = `Not found News with id ${idNews}`
        }
        return res;
    }




}

module.exports = AllNewsUsers;
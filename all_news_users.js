let News = require("./news.js");
let User = require("./user.js")
let EventEmitter = require("./event_emitter.js");

let ee = new EventEmitter();

class AllNewsUsers {
    constructor(eventEmitter) {
        this._allNews = [];
        this._allUsers = [];
        this._eventEmitter = eventEmitter;
        this._counterNews = 0;
    }

    get allNews() {
        return this._allNews;
    }
    get allUsers() {
        return this._allUsers;
    }
    get eventEmitter(){
        return this._eventEmitter;
    }

    createNews(titleNews) {
        let flagTitleNews = false;
        this._allNews.some(oneNews => {
            if (oneNews.title == titleNews) {
                console.log("Id news in create news " + oneNews.id);
                
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
            console.log("Id news in create news " + oneNews.id);
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

    // subscribeUser(titleNews, idUser) {
    //     let res = "";
    //     if (this._allUsers[idUser]) {
    //         res = this._allUsers[idUser];
    //         this._eventEmitter.subscribe(titleNews, res.getNews)
            
    //         const user = this._allNews.find(oneNews => {
    //             if(oneNews.title === titleNews){
    //                 // let idNews = oneNews.id;
    //                 // let subscription = { idNews, titleNews };
    //                 // this._allUsers[idUser].subscriptions.push(subscription)
    //                 return true
    //             }
    //             return false;
    //         })
    //     } else {
    //         res = `Not found User with id ${idUser}`
    //     }
    //     return res;
    // }

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

    // exportUser(idUser){
    //     let user = this.getUser(idUser);

    // }
    

    getNews(idNews){
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
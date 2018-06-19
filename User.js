class User {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this.getNews = this.getNews.bind(this);
        this._articles = [];
        this._subscriptions = [];
    }

    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get articles(){
        return this._articles;
    }
    get subscriptions(){
        return this._subscriptions;
    }

    getNews(news) {
        let title = news.title;
        let message = news.message;
        let newsId = news.newsId;
        let article = {
            title,
            message,
            newsId
        }
        this._articles.push(article);
    };
}

module.exports = User;